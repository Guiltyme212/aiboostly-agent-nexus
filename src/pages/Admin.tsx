import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  fetchLeads,
  Lead,
  STATUS_PRIORITY,
  getStatusColor,
  getRatingColor,
} from "@/lib/leads";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RefreshCw,
  Search,
  ExternalLink,
  Eye,
  Copy,
  Phone,
  Mail,
  MapPin,
  Star,
  Zap,
  Users,
  Rocket,
  AlertTriangle,
  Wrench,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Columns3,
  Download,
  Send,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Globe,
  MapPinned,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/* ─── Quick‑filter presets ─── */
interface QuickFilter {
  label: string;
  key: string;
  test: (l: Lead) => boolean;
}

const QUICK_FILTERS: QuickFilter[] = [
  { label: "All", key: "all", test: () => true },
  { label: "Needs Preview", key: "needs_preview", test: (l) => l.status.toUpperCase() === "NEEDS_PREVIEW" },
  { label: "Building", key: "building", test: (l) => ["BUILDING", "DEPLOYING"].includes(l.status.toUpperCase()) },
  { label: "Deployed", key: "deployed", test: (l) => l.status.toUpperCase() === "DEPLOYED" },
  { label: "Has Email Draft", key: "has_draft", test: (l) => !!l.emailDraft.trim() },
  { label: "Receiving", key: "receiving", test: (l) => l.emailStatus.toUpperCase() === "RECEIVING" },
];

/* ─── Column defs ─── */
function buildColumns(copyEmail: (e: string) => void): ColumnDef<Lead>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
          className="translate-y-[2px]"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 36,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status;
        return (
          <Badge variant="outline" className={`text-xs whitespace-nowrap ${getStatusColor(s)}`}>
            {s}
          </Badge>
        );
      },
      sortingFn: (a, b) => {
        const pa = STATUS_PRIORITY[a.original.status.toUpperCase()] ?? 99;
        const pb = STATUS_PRIORITY[b.original.status.toUpperCase()] ?? 99;
        return pa - pb;
      },
    },
    {
      accessorKey: "businessName",
      header: "Business Name",
      cell: ({ row }) => {
        const l = row.original;
        return (
          <div className="flex items-center gap-2.5 min-w-[180px]">
            {l.photoUrl && (
              <img
                src={l.photoUrl}
                alt=""
                className="h-7 w-7 rounded-full object-cover flex-shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            )}
            <div>
              <p className="font-medium text-sm leading-tight">{l.businessName}</p>
              {l.city && <p className="text-[11px] text-muted-foreground leading-tight">{l.city}</p>}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "website",
      header: "Website",
      cell: ({ row }) => {
        const w = row.original.website;
        if (!w) return <span className="text-muted-foreground text-xs">—</span>;
        return (
          <a href={w} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline truncate max-w-[150px] block" onClick={(e) => e.stopPropagation()}>
            {w.replace(/^https?:\/\/(www\.)?/, "").slice(0, 30)}
          </a>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.category || "—"}</span>,
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const l = row.original;
        if (l.rating === null) return <span className="text-xs text-muted-foreground">—</span>;
        return (
          <span className={`text-sm font-medium whitespace-nowrap ${getRatingColor(l.rating)}`}>
            {l.rating.toFixed(1)} <Star className="inline h-3 w-3 -mt-0.5" />
          </span>
        );
      },
      sortingFn: (a, b) => (a.original.rating ?? -1) - (b.original.rating ?? -1),
    },
    {
      accessorKey: "reviews",
      header: "Reviews",
      cell: ({ row }) => {
        const r = row.original.reviews;
        return <span className="text-sm text-muted-foreground">{r !== null ? r : "—"}</span>;
      },
      sortingFn: (a, b) => (a.original.reviews ?? -1) - (b.original.reviews ?? -1),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const e = row.original.email;
        if (!e) return <span className="text-xs text-muted-foreground">—</span>;
        return (
          <button
            className="text-xs text-blue-400 hover:underline truncate max-w-[160px] block text-left"
            onClick={(ev) => { ev.stopPropagation(); copyEmail(e); }}
            title="Click to copy"
          >
            {e}
          </button>
        );
      },
    },
    {
      accessorKey: "emailStatus",
      header: "Email Status",
      cell: ({ row }) => {
        const s = row.original.emailStatus;
        const isReceiving = s?.toUpperCase() === "RECEIVING";
        return (
          <span className={`flex items-center gap-1.5 text-xs ${isReceiving ? "text-emerald-400" : "text-muted-foreground"}`}>
            <span className={`h-2 w-2 rounded-full ${isReceiving ? "bg-emerald-400" : "bg-muted-foreground/40"}`} />
            {s || "—"}
          </span>
        );
      },
    },
    {
      accessorKey: "emailDraft",
      header: "Email Draft",
      cell: ({ row }) => {
        const d = row.original.emailDraft;
        if (!d) return <span className="text-xs text-muted-foreground">—</span>;
        return <span className="text-xs truncate max-w-[150px] block">{d.slice(0, 60)}…</span>;
      },
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => <span className="text-sm">{row.original.city || "—"}</span>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        const p = row.original.phone;
        if (!p) return <span className="text-xs text-muted-foreground">—</span>;
        return <a href={`tel:${p}`} className="text-xs text-blue-400 hover:underline" onClick={(e) => e.stopPropagation()}>{p}</a>;
      },
    },
    {
      accessorKey: "fullAddress",
      header: "Full Address",
      cell: ({ row }) => <span className="text-xs text-muted-foreground truncate max-w-[180px] block">{row.original.fullAddress || "—"}</span>,
    },
    {
      accessorKey: "postalCode",
      header: "Postal Code",
      cell: ({ row }) => <span className="text-xs">{row.original.postalCode || "—"}</span>,
    },
    {
      accessorKey: "subtypes",
      header: "Services",
      cell: ({ row }) => <span className="text-xs truncate max-w-[150px] block">{row.original.subtypes || "—"}</span>,
    },
    {
      accessorKey: "websiteDescription",
      header: "Website Desc",
      cell: ({ row }) => <span className="text-xs truncate max-w-[150px] block">{row.original.websiteDescription || "—"}</span>,
    },
    {
      accessorKey: "workingHours",
      header: "Working Hours",
      cell: ({ row }) => <span className="text-xs">{row.original.workingHours || "—"}</span>,
    },
    {
      accessorKey: "cms",
      header: "CMS",
      cell: ({ row }) => <span className="text-xs">{row.original.cms || "—"}</span>,
    },
    {
      accessorKey: "previewUrl",
      header: "Preview",
      cell: ({ row }) => {
        const u = row.original.previewUrl;
        if (!u) return <span className="text-xs text-muted-foreground">—</span>;
        return (
          <a href={u} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
            <Eye className="h-4 w-4 text-blue-400 hover:text-blue-300" />
          </a>
        );
      },
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }) => <span className="text-xs truncate max-w-[120px] block">{row.original.notes || "—"}</span>,
    },
    {
      accessorKey: "sentDate",
      header: "Sent Date",
      cell: ({ row }) => <span className="text-xs">{row.original.sentDate || "—"}</span>,
    },
    {
      accessorKey: "response",
      header: "Response",
      cell: ({ row }) => <span className="text-xs">{row.original.response || "—"}</span>,
    },
    {
      accessorKey: "contactName",
      header: "Contact Name",
      cell: ({ row }) => <span className="text-xs">{row.original.contactName || "—"}</span>,
    },
    {
      accessorKey: "facebook",
      header: "Facebook",
      cell: ({ row }) => {
        const f = row.original.facebook;
        if (!f) return <span className="text-xs text-muted-foreground">—</span>;
        return <a href={f} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-blue-400"><Globe className="h-4 w-4" /></a>;
      },
    },
    {
      accessorKey: "instagram",
      header: "Instagram",
      cell: ({ row }) => {
        const ig = row.original.instagram;
        if (!ig) return <span className="text-xs text-muted-foreground">—</span>;
        return <a href={ig} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-pink-400"><Globe className="h-4 w-4" /></a>;
      },
    },
    {
      accessorKey: "googleMapsLink",
      header: "Google Maps",
      cell: ({ row }) => {
        const gm = row.original.googleMapsLink;
        if (!gm) return <span className="text-xs text-muted-foreground">—</span>;
        return <a href={gm} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-emerald-400"><MapPinned className="h-4 w-4" /></a>;
      },
    },
  ];
}

/* ─── Default visible columns ─── */
const DEFAULT_HIDDEN: string[] = [
  "website", "emailDraft", "city", "phone", "fullAddress", "postalCode",
  "subtypes", "websiteDescription", "workingHours", "cms", "notes",
  "sentDate", "response", "contactName", "facebook", "instagram", "googleMapsLink",
];

export default function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  /* quick filter */
  const [quickFilter, setQuickFilter] = useState("all");

  /* dropdown filters */
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [globalSearch, setGlobalSearch] = useState("");

  /* table state */
  const [sorting, setSorting] = useState<SortingState>([{ id: "status", desc: false }]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    Object.fromEntries(DEFAULT_HIDDEN.map((k) => [k, false]))
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });

  const { toast } = useToast();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLeads();
      setLeads(data);
      setLastRefreshed(new Date());
    } catch {
      setError("Couldn't load data from Google Sheets. Make sure the sheet is published to web.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [loadData]);

  function copyEmail(email: string) {
    navigator.clipboard.writeText(email);
    toast({ title: "Email copied", description: email });
  }

  /* ── Derived unique values ── */
  const uniqueStatuses = useMemo(() => Array.from(new Set(leads.map((l) => l.status.toUpperCase()).filter(Boolean))).sort(), [leads]);
  const uniqueCities = useMemo(() => Array.from(new Set(leads.map((l) => l.city).filter(Boolean))).sort(), [leads]);
  const uniqueCategories = useMemo(() => Array.from(new Set(leads.map((l) => l.category).filter(Boolean))).sort(), [leads]);

  /* ── Stats ── */
  const stats = useMemo(() => {
    const total = leads.length;
    const deployed = leads.filter((l) => l.status.toUpperCase() === "DEPLOYED").length;
    const needsPreview = leads.filter((l) => l.status.toUpperCase() === "NEEDS_PREVIEW").length;
    const building = leads.filter((l) => ["BUILDING", "DEPLOYING"].includes(l.status.toUpperCase())).length;
    const emailed = leads.filter((l) => !!l.sentDate.trim()).length;
    return { total, deployed, needsPreview, building, emailed };
  }, [leads]);

  /* ── Quick‑filter counts ── */
  const quickFilterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    QUICK_FILTERS.forEach((qf) => {
      counts[qf.key] = leads.filter(qf.test).length;
    });
    return counts;
  }, [leads]);

  /* ── Pre‑filter data by quick filter + dropdown filters ── */
  const filteredData = useMemo(() => {
    let result = leads;
    // quick filter
    const qf = QUICK_FILTERS.find((f) => f.key === quickFilter);
    if (qf) result = result.filter(qf.test);
    // status dropdown
    if (statusFilter !== "ALL") result = result.filter((l) => l.status.toUpperCase() === statusFilter);
    // city dropdown
    if (cityFilter !== "ALL") result = result.filter((l) => l.city === cityFilter);
    // category dropdown
    if (categoryFilter !== "ALL") result = result.filter((l) => l.category === categoryFilter);
    // global search
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      result = result.filter(
        (l) =>
          l.businessName.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q)
      );
    }
    return result;
  }, [leads, quickFilter, statusFilter, cityFilter, categoryFilter, globalSearch]);

  /* ── Columns ── */
  const columns = useMemo(() => buildColumns(copyEmail), []);

  /* ── Table instance ── */
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, columnVisibility, rowSelection, pagination },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const selectedCount = Object.keys(rowSelection).length;

  /* ── Export CSV ── */
  function exportCSV() {
    const visibleCols = table.getVisibleLeafColumns().filter((c) => c.id !== "select");
    const headerLine = visibleCols.map((c) => c.columnDef.header as string).join(",");
    const rows = table.getFilteredRowModel().rows.map((row) =>
      visibleCols
        .map((col) => {
          const val = row.getValue(col.id);
          const str = val === null || val === undefined ? "" : String(val);
          return `"${str.replace(/"/g, '""')}"`;
        })
        .join(",")
    );
    const csv = [headerLine, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leadpilot-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ── Stat cards config ── */
  const statCards = [
    { label: "Total Leads", value: stats.total, icon: Users, accent: "text-blue-400", bg: "border-blue-500/30" },
    { label: "Deployed", value: stats.deployed, icon: Rocket, accent: "text-emerald-400", bg: "border-emerald-500/30" },
    { label: "Needs Preview", value: stats.needsPreview, icon: AlertTriangle, accent: "text-amber-400", bg: "border-amber-500/30" },
    { label: "Building", value: stats.building, icon: Wrench, accent: "text-purple-400", bg: "border-purple-500/30" },
    { label: "Emailed", value: stats.emailed, icon: Send, accent: "text-sky-400", bg: "border-sky-500/30" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-amber-400" /> LeadPilot Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {lastRefreshed ? `Last refreshed: ${lastRefreshed.toLocaleTimeString()}` : "Loading…"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
      </header>

      <main className="p-6 max-w-[1600px] mx-auto space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {statCards.map((s) => (
            <Card key={s.label} className={`border ${s.bg} bg-card`}>
              <CardContent className="p-3 flex items-center gap-3">
                <s.icon className={`h-7 w-7 ${s.accent}`} />
                <div>
                  <p className="text-xl font-bold">{loading ? "—" : s.value}</p>
                  <p className="text-[11px] text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick filter pills */}
        <div className="flex flex-wrap gap-2">
          {QUICK_FILTERS.map((qf) => (
            <button
              key={qf.key}
              onClick={() => { setQuickFilter(qf.key); setPagination((p) => ({ ...p, pageIndex: 0 })); }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                quickFilter === qf.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-muted-foreground/50"
              }`}
            >
              {qf.label} ({quickFilterCounts[qf.key] ?? 0})
            </button>
          ))}
        </div>

        {/* Dropdown filters + search + column toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPagination((p) => ({ ...p, pageIndex: 0 })); }}>
            <SelectTrigger className="w-[160px] h-9 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              {uniqueStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={cityFilter} onValueChange={(v) => { setCityFilter(v); setPagination((p) => ({ ...p, pageIndex: 0 })); }}>
            <SelectTrigger className="w-[160px] h-9 text-xs"><SelectValue placeholder="City" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Cities</SelectItem>
              {uniqueCities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setPagination((p) => ({ ...p, pageIndex: 0 })); }}>
            <SelectTrigger className="w-[160px] h-9 text-xs"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>
              {uniqueCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search name, city, category, email…"
              value={globalSearch}
              onChange={(e) => { setGlobalSearch(e.target.value); setPagination((p) => ({ ...p, pageIndex: 0 })); }}
              className="pl-9 h-9 text-xs"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Columns3 className="h-4 w-4 mr-2" /> Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 max-h-80 overflow-y-auto">
              {table
                .getAllColumns()
                .filter((c) => c.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={col.getIsVisible()}
                    onCheckedChange={(v) => col.toggleVisibility(!!v)}
                    className="capitalize text-xs"
                  >
                    {(col.columnDef.header as string) ?? col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">
            Showing {filteredData.length} of {leads.length} leads
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">{error}</div>
        )}

        {/* Loading skeleton */}
        {loading && leads.length === 0 && (
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
          </div>
        )}

        {/* Data Table */}
        {!error && (!loading || leads.length > 0) && (
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-card">
                  {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id} className="hover:bg-transparent border-b border-border">
                      {hg.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="whitespace-nowrap text-xs h-9 px-3"
                          style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                        >
                          {header.isPlaceholder ? null : header.column.getCanSort() ? (
                            <button
                              className="flex items-center gap-1 select-none hover:text-foreground transition-colors"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{ asc: <ArrowUp className="h-3 w-3" />, desc: <ArrowDown className="h-3 w-3" /> }[header.column.getIsSorted() as string] ?? <ArrowUpDown className="h-3 w-3 opacity-30" />}
                            </button>
                          ) : (
                            flexRender(header.column.columnDef.header, header.getContext())
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="text-center py-12 text-muted-foreground">
                        No leads found matching your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    table.getRowModel().rows.map((row, idx) => (
                      <TableRow
                        key={row.id}
                        className={`cursor-pointer h-10 ${idx % 2 === 1 ? "bg-muted/20" : ""} ${row.getIsSelected() ? "bg-primary/10" : ""}`}
                        onClick={() => setSelectedLead(row.original)}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="py-1.5 px-3 text-sm">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {!error && filteredData.length > 0 && (
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Rows per page</span>
              <Select
                value={String(pagination.pageSize)}
                onValueChange={(v) => setPagination({ pageIndex: 0, pageSize: v === "ALL" ? filteredData.length : Number(v) })}
              >
                <SelectTrigger className="w-[70px] h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[25, 50, 100].map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                  <SelectItem value="ALL">All</SelectItem>
                </SelectContent>
              </Select>
              <span className="ml-2">
                Showing {pagination.pageIndex * pagination.pageSize + 1}–{Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length)} of {filteredData.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground px-2">
                Page {pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Selection bar */}
        {selectedCount > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg shadow-lg px-6 py-3 flex items-center gap-4 z-40">
            <span className="text-sm font-medium">{selectedCount} selected</span>
            <Button variant="outline" size="sm" onClick={() => setRowSelection({})}>Clear</Button>
          </div>
        )}
      </main>

      {/* ── Side Panel ── */}
      <Sheet open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          {selectedLead && (
            <>
              <SheetHeader>
                <SheetTitle className="text-xl">{selectedLead.businessName}</SheetTitle>
                <SheetDescription>
                  {selectedLead.category}{selectedLead.city ? ` · ${selectedLead.city}` : ""}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Photo */}
                {selectedLead.photoUrl && (
                  <img src={selectedLead.photoUrl} alt={selectedLead.businessName} className="w-full h-48 object-cover rounded-lg" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                )}

                {/* Rating & Status */}
                <div className="flex items-center gap-4">
                  {selectedLead.rating !== null && (
                    <span className={`text-lg font-semibold ${getRatingColor(selectedLead.rating)}`}>
                      {selectedLead.rating.toFixed(1)} <Star className="inline h-4 w-4 -mt-0.5" />
                      {selectedLead.reviews !== null && <span className="text-sm text-muted-foreground ml-1">({selectedLead.reviews} reviews)</span>}
                    </span>
                  )}
                  <Badge variant="outline" className={getStatusColor(selectedLead.status)}>{selectedLead.status}</Badge>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Contact</h3>
                  {selectedLead.contactName && <p className="text-sm font-medium">{selectedLead.contactName}</p>}
                  {selectedLead.phone && (
                    <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <Phone className="h-4 w-4 text-muted-foreground" /> {selectedLead.phone}
                    </a>
                  )}
                  {selectedLead.email && (
                    <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <Mail className="h-4 w-4 text-muted-foreground" /> {selectedLead.email}
                    </a>
                  )}
                  {selectedLead.fullAddress && (
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0" /> {selectedLead.fullAddress}
                    </p>
                  )}
                  {selectedLead.website && (
                    <a href={selectedLead.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" /> {selectedLead.website}
                    </a>
                  )}
                </div>

                {/* Social links */}
                {(selectedLead.facebook || selectedLead.instagram || selectedLead.googleMapsLink) && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Links</h3>
                    <div className="flex gap-2">
                      {selectedLead.facebook && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={selectedLead.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                        </Button>
                      )}
                      {selectedLead.instagram && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={selectedLead.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                        </Button>
                      )}
                      {selectedLead.googleMapsLink && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={selectedLead.googleMapsLink} target="_blank" rel="noopener noreferrer">
                            <MapPinned className="h-4 w-4 mr-1" /> Maps
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {/* Email Draft */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Email Draft</h3>
                  {selectedLead.emailDraft ? (
                    <p className="text-sm bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">{selectedLead.emailDraft}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No email draft generated</p>
                  )}
                </div>

                {/* Sent Date & Response */}
                {(selectedLead.sentDate || selectedLead.response) && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Outreach</h3>
                    {selectedLead.sentDate && <p className="text-sm"><span className="text-muted-foreground">Sent:</span> {selectedLead.sentDate}</p>}
                    {selectedLead.response && <p className="text-sm"><span className="text-muted-foreground">Response:</span> {selectedLead.response}</p>}
                  </div>
                )}

                {/* Services */}
                {selectedLead.subtypes && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Services</h3>
                    <p className="text-sm">{selectedLead.subtypes}</p>
                  </div>
                )}

                {/* Pipeline */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pipeline</h3>
                  {selectedLead.previewUrl && (
                    <Button className="w-full" asChild>
                      <a href={selectedLead.previewUrl} target="_blank" rel="noopener noreferrer">Open Preview →</a>
                    </Button>
                  )}
                  {selectedLead.website && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={selectedLead.website} target="_blank" rel="noopener noreferrer">Open Original Website</a>
                    </Button>
                  )}
                  {selectedLead.googleMapsLink && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={selectedLead.googleMapsLink} target="_blank" rel="noopener noreferrer">
                        <MapPinned className="h-4 w-4 mr-2" /> Open in Google Maps
                      </a>
                    </Button>
                  )}
                </div>

                {/* Notes */}
                {selectedLead.notes && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notes</h3>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">{selectedLead.notes}</p>
                  </div>
                )}

                {/* Open in Sheets */}
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://docs.google.com/spreadsheets/d/1LbFulV5XzbCUHc1mn5uWo9Dt65T60fFJaH9yq4ZcvwY/edit" target="_blank" rel="noopener noreferrer">
                    Open in Google Sheets
                  </a>
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
