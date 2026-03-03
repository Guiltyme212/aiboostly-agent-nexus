import React, { useState, useEffect, useMemo, useCallback, useRef, useTransition } from "react";
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
  useReactTable,
  SortingState,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  ListOrdered,
  Download,
  Send,
  Globe,
  MapPinned,
  Pencil,
  Loader2,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/* ─── Apps Script API (direct browser fetch with CORS fallback) ─── */
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwL0ilnsP9NyGWBDbJgHCXT2LMNBVuo44jZg0VAPHkYmlQEXOEalH2-Enr2BeHic4yWWg/exec";

async function updateSheet(businessName: string, column: string, value: string): Promise<boolean> {
  const params = new URLSearchParams({
    action: 'updateCell',
    row: businessName.split('\n')[0].trim(),
    column: column,
    value: value,
  });

  const url = `${APPS_SCRIPT_URL}?${params}`;
  console.log('[API] Calling:', url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    });

    console.log('[API] Response status:', response.status);
    console.log('[API] Response type:', response.type);

    if (response.type === 'opaque') {
      console.warn('[API] Got opaque response - CORS issue. Trying no-cors fallback.');
      await fetch(url, { method: 'GET', mode: 'no-cors', redirect: 'follow' });
      return true;
    }

    const text = await response.text();
    console.log('[API] Response body:', text);

    const data = JSON.parse(text);

    if (!data.success) {
      console.error('[API] Server returned error:', data.error);
      throw new Error(data.error || 'Update failed on server');
    }

    console.log('[API] Success! Updated row', data.row);
    return true;
  } catch (err) {
    console.error('[API] Fetch error:', err);

    try {
      console.log('[API] Attempting no-cors fallback...');
      await fetch(url, { method: 'GET', mode: 'no-cors', redirect: 'follow' });
      console.log('[API] no-cors request sent (cannot verify response)');
      return true;
    } catch (fallbackErr) {
      console.error('[API] Even no-cors failed:', fallbackErr);
      throw new Error('Failed to reach Google Apps Script API');
    }
  }
}

/* ─── Statuses list ─── */
const ALL_STATUSES = [
  "new", "scrape", "scraped", "analyze", "analyzed", "build",
  "BUILDING", "DEPLOYING", "DEPLOYED", "NEEDS_PREVIEW",
  "email", "emailed", "paid", "skip",
];

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

/* ─── Inline editable status cell ─── */
function StatusCell({
  lead,
  onUpdate,
}: {
  lead: Lead;
  onUpdate: (businessName: string, column: string, value: string, field: keyof Lead) => Promise<void>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setIsSaving(true);
    try {
      await onUpdate(lead.businessName, "Status", newStatus, "status");
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <select
        autoFocus
        defaultValue={lead.status}
        onChange={handleChange}
        onBlur={() => setIsEditing(false)}
        className="bg-card text-foreground text-xs rounded px-2 py-1 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {ALL_STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    );
  }

  return (
    <button
      onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
      disabled={isSaving}
      className="cursor-pointer hover:ring-1 hover:ring-primary/50 rounded transition inline-flex items-center gap-1"
      title="Click to change status"
    >
      <Badge variant="outline" className={`text-xs whitespace-nowrap ${getStatusColor(lead.status)}`}>
        {lead.status}
      </Badge>
      {isSaving && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
    </button>
  );
}

/* ─── Inline editable notes cell ─── */
function NotesCell({
  lead,
  onUpdate,
}: {
  lead: Lead;
  onUpdate: (businessName: string, column: string, value: string, field: keyof Lead) => Promise<void>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(lead.notes);
  const [isSaving, setIsSaving] = useState(false);

  // Sync when lead changes externally (auto-refresh)
  useEffect(() => { setValue(lead.notes); }, [lead.notes]);

  const save = async () => {
    if (value === lead.notes) { setIsEditing(false); return; }
    setIsSaving(true);
    try {
      await onUpdate(lead.businessName, "Notes", value, "notes");
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => { if (e.key === "Enter") save(); if (e.key === "Escape") setIsEditing(false); }}
        className="bg-card text-foreground text-xs rounded px-2 py-1 border border-border w-full min-w-[120px] focus:outline-none focus:ring-1 focus:ring-primary"
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <span
      className="text-xs truncate max-w-[120px] block group cursor-pointer hover:text-foreground transition-colors relative"
      onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
      title="Click to edit notes"
    >
      {lead.notes || "—"}
      <Pencil className="h-3 w-3 text-muted-foreground/0 group-hover:text-muted-foreground absolute -right-4 top-0.5 transition-colors" />
    </span>
  );
}

/* ─── Column defs ─── */
function buildColumns(
  copyEmail: (e: string) => void,
  handleCellUpdate: (businessName: string, column: string, value: string, field: keyof Lead) => Promise<void>,
): ColumnDef<Lead>[] {
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
      cell: ({ row }) => <StatusCell lead={row.original} onUpdate={handleCellUpdate} />,
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
              <img src={l.photoUrl} alt="" className="h-7 w-7 rounded-full object-cover flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
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
          <button className="text-xs text-blue-400 hover:underline truncate max-w-[160px] block text-left" onClick={(ev) => { ev.stopPropagation(); copyEmail(e); }} title="Click to copy">
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
      cell: ({ row }) => <NotesCell lead={row.original} onUpdate={handleCellUpdate} />,
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
  "subtypes", "websiteDescription", "workingHours", "cms",
  "sentDate", "response", "contactName", "facebook", "instagram", "googleMapsLink",
];

const ROW_HEIGHT = 52;

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

  /* sorting transition */
  const [isPending, startTransition] = useTransition();

  /* side panel editable state */
  const [panelNotes, setPanelNotes] = useState("");
  const [panelStatus, setPanelStatus] = useState("");
  const [panelSaving, setPanelSaving] = useState<string | null>(null);

  const tableContainerRef = useRef<HTMLDivElement>(null);
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

  // Sync panel state when selectedLead changes
  useEffect(() => {
    if (selectedLead) {
      setPanelNotes(selectedLead.notes);
      setPanelStatus(selectedLead.status);
    }
  }, [selectedLead]);

  function copyEmail(email: string) {
    navigator.clipboard.writeText(email);
    toast({ title: "Email copied", description: email });
  }

  /* ── Optimistic cell update ── */
  const handleCellUpdate = useCallback(async (
    businessName: string,
    column: string,
    value: string,
    field: keyof Lead,
  ) => {
    // Optimistic: update local data immediately
    const oldLeads = [...leads];
    setLeads((prev) =>
      prev.map((l) =>
        l.businessName === businessName ? { ...l, [field]: value } : l
      )
    );
    // Also update selectedLead if it's the same
    setSelectedLead((prev) =>
      prev && prev.businessName === businessName ? { ...prev, [field]: value } : prev
    );

    try {
      console.log(`[CellUpdate] "${businessName}" → ${column} = "${value}"`);
      await updateSheet(businessName, column, value);
      toast({ title: `✅ ${column} updated`, description: `Set to "${value}"` });
    } catch (err) {
      // Revert on failure
      setLeads(oldLeads);
      setSelectedLead((prev) =>
        prev && prev.businessName === businessName
          ? oldLeads.find((l) => l.businessName === businessName) || prev
          : prev
      );
      toast({
        title: "❌ Update failed",
        description: "Check Apps Script URL and permissions",
        variant: "destructive",
      });
      throw err;
    }
  }, [leads, toast]);

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
    QUICK_FILTERS.forEach((qf) => { counts[qf.key] = leads.filter(qf.test).length; });
    return counts;
  }, [leads]);

  /* ── Pre‑filter data ── */
  const filteredData = useMemo(() => {
    let result = leads;
    const qf = QUICK_FILTERS.find((f) => f.key === quickFilter);
    if (qf) result = result.filter(qf.test);
    if (statusFilter !== "ALL") result = result.filter((l) => l.status.toUpperCase() === statusFilter);
    if (cityFilter !== "ALL") result = result.filter((l) => l.city === cityFilter);
    if (categoryFilter !== "ALL") result = result.filter((l) => l.category === categoryFilter);
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
  const columns = useMemo(() => buildColumns(copyEmail, handleCellUpdate), [handleCellUpdate]);

  /* ── Table instance (no pagination) ── */
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, columnVisibility, rowSelection },
    onSortingChange: (updater) => {
      startTransition(() => { setSorting(updater); });
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  const { rows } = table.getRowModel();

  /* ── Virtual scrolling ── */
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });

  const selectedCount = Object.keys(rowSelection).length;

  /* ── Export CSV ── */
  function exportCSV() {
    const visibleCols = table.getVisibleLeafColumns().filter((c) => c.id !== "select");
    const headerLine = visibleCols.map((c) => c.columnDef.header as string).join(",");
    const csvRows = rows.map((row) =>
      visibleCols
        .map((col) => {
          const val = row.getValue(col.id);
          const str = val === null || val === undefined ? "" : String(val);
          return `"${str.replace(/"/g, '""')}"`;
        })
        .join(",")
    );
    const csv = [headerLine, ...csvRows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leadpilot-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ── Side panel save handlers ── */
  async function savePanelStatus(newStatus: string) {
    if (!selectedLead || newStatus === selectedLead.status) return;
    setPanelSaving("status");
    try {
      await handleCellUpdate(selectedLead.businessName, "Status", newStatus, "status");
      setPanelStatus(newStatus);
    } finally {
      setPanelSaving(null);
    }
  }

  async function savePanelNotes() {
    if (!selectedLead || panelNotes === selectedLead.notes) return;
    setPanelSaving("notes");
    try {
      await handleCellUpdate(selectedLead.businessName, "Notes", panelNotes, "notes");
    } finally {
      setPanelSaving(null);
    }
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
              onClick={() => setQuickFilter(qf.key)}
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px] h-9 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              {uniqueStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[160px] h-9 text-xs"><SelectValue placeholder="City" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Cities</SelectItem>
              {uniqueCities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
          <Button
            variant={sorting.length === 0 ? "secondary" : "outline"}
            size="sm"
            className="h-9"
            onClick={() => startTransition(() => setSorting([]))}
            title="Reset to Google Sheet row order"
          >
            <ListOrdered className="h-4 w-4 mr-2" /> Sheet Order
          </Button>
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

        {/* Data Table with Virtual Scrolling */}
        {!error && (!loading || leads.length > 0) && (
          <div className={`rounded-lg border border-border overflow-hidden relative ${isPending ? "opacity-60" : ""}`} style={{ transition: "opacity 0.15s" }}>
            {isPending && (
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            <div
              ref={tableContainerRef}
              className="overflow-auto"
              style={{ height: "calc(100vh - 360px)" }}
            >
              <table className="w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-card">
                  {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id} className="border-b border-border">
                      {hg.headers.map((header) => (
                        <th
                          key={header.id}
                          className="whitespace-nowrap text-xs h-9 px-3 text-left font-medium text-muted-foreground"
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
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="text-center py-12 text-muted-foreground">
                        No leads found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    <>
                      {/* Spacer for virtual scroll offset */}
                      {rowVirtualizer.getVirtualItems().length > 0 && (
                        <tr style={{ height: `${rowVirtualizer.getVirtualItems()[0].start}px` }}>
                          <td colSpan={columns.length} />
                        </tr>
                      )}
                      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const row = rows[virtualRow.index];
                        return (
                          <tr
                            key={row.id}
                            className={`cursor-pointer border-b border-border/50 hover:bg-muted/30 ${virtualRow.index % 2 === 1 ? "bg-muted/10" : ""} ${row.getIsSelected() ? "bg-primary/10" : ""}`}
                            style={{ height: `${virtualRow.size}px` }}
                            onClick={() => setSelectedLead(row.original)}
                            data-state={row.getIsSelected() && "selected"}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <td key={cell.id} className="py-1.5 px-3 text-sm">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                      {/* Bottom spacer */}
                      {rowVirtualizer.getVirtualItems().length > 0 && (
                        <tr style={{ height: `${rowVirtualizer.getTotalSize() - (rowVirtualizer.getVirtualItems()[rowVirtualizer.getVirtualItems().length - 1].end)}px` }}>
                          <td colSpan={columns.length} />
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
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

                {/* Rating & Editable Status */}
                <div className="flex items-center gap-4">
                  {selectedLead.rating !== null && (
                    <span className={`text-lg font-semibold ${getRatingColor(selectedLead.rating)}`}>
                      {selectedLead.rating.toFixed(1)} <Star className="inline h-4 w-4 -mt-0.5" />
                      {selectedLead.reviews !== null && <span className="text-sm text-muted-foreground ml-1">({selectedLead.reviews} reviews)</span>}
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <select
                      value={panelStatus}
                      onChange={(e) => { setPanelStatus(e.target.value); savePanelStatus(e.target.value); }}
                      className="bg-card text-foreground text-sm rounded px-3 py-1.5 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {ALL_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {panelSaving === "status" && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                  </div>
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

                {/* Editable Notes */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notes</h3>
                  <Textarea
                    value={panelNotes}
                    onChange={(e) => setPanelNotes(e.target.value)}
                    className="min-h-[80px] text-sm"
                    placeholder="Add notes…"
                  />
                  <Button
                    size="sm"
                    onClick={savePanelNotes}
                    disabled={panelSaving === "notes" || panelNotes === selectedLead.notes}
                  >
                    {panelSaving === "notes" ? (
                      <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Saving…</>
                    ) : (
                      <><Check className="h-4 w-4 mr-1" /> Save Notes</>
                    )}
                  </Button>
                </div>

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
