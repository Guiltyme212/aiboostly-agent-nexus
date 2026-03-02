import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  fetchLeads,
  Lead,
  STATUS_PRIORITY,
  getStatusColor,
  getRatingColor,
} from "@/lib/leads";
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
import { ScrollArea } from "@/components/ui/scroll-area";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SortKey = "businessName" | "category" | "rating" | "status" | "emailStatus";
type SortDir = "asc" | "desc";

export default function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const [sortKey, setSortKey] = useState<SortKey>("status");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

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

  // Derived data
  const uniqueStatuses = useMemo(() => {
    const s = new Set(leads.map((l) => l.status.toUpperCase()).filter(Boolean));
    return Array.from(s).sort();
  }, [leads]);

  const uniqueCities = useMemo(() => {
    const c = new Set(leads.map((l) => l.city).filter(Boolean));
    return Array.from(c).sort();
  }, [leads]);

  const stats = useMemo(() => {
    const total = leads.length;
    const deployed = leads.filter((l) => l.status.toUpperCase() === "DEPLOYED").length;
    const needsPreview = leads.filter((l) => l.status.toUpperCase() === "NEEDS_PREVIEW").length;
    const building = leads.filter((l) =>
      ["BUILDING", "DEPLOYING"].includes(l.status.toUpperCase())
    ).length;
    return { total, deployed, needsPreview, building };
  }, [leads]);

  const filteredLeads = useMemo(() => {
    let result = leads;
    if (statusFilter !== "ALL") {
      result = result.filter((l) => l.status.toUpperCase() === statusFilter);
    }
    if (cityFilter !== "ALL") {
      result = result.filter((l) => l.city === cityFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.businessName.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q)
      );
    }
    // Sort
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "status") {
        const pa = STATUS_PRIORITY[a.status.toUpperCase()] ?? 99;
        const pb = STATUS_PRIORITY[b.status.toUpperCase()] ?? 99;
        cmp = pa - pb;
      } else if (sortKey === "rating") {
        cmp = (a.rating ?? -1) - (b.rating ?? -1);
      } else {
        cmp = (a[sortKey] ?? "").localeCompare(b[sortKey] ?? "");
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [leads, statusFilter, cityFilter, search, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function copyEmail(email: string) {
    navigator.clipboard.writeText(email);
    toast({ title: "Email copied", description: email });
  }

  // Stats cards config
  const statCards = [
    { label: "Total Leads", value: stats.total, icon: Users, accent: "text-blue-400", bg: "border-blue-500/30" },
    { label: "Deployed", value: stats.deployed, icon: Rocket, accent: "text-emerald-400", bg: "border-emerald-500/30" },
    { label: "Needs Preview", value: stats.needsPreview, icon: AlertTriangle, accent: "text-amber-400", bg: "border-amber-500/30" },
    { label: "Building", value: stats.building, icon: Wrench, accent: "text-purple-400", bg: "border-purple-500/30" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-amber-400" />
            LeadPilot Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {lastRefreshed
              ? `Last refreshed: ${lastRefreshed.toLocaleTimeString()}`
              : "Loading..."}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </header>

      <main className="p-6 max-w-[1440px] mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <Card key={s.label} className={`border ${s.bg} bg-card`}>
              <CardContent className="p-4 flex items-center gap-3">
                <s.icon className={`h-8 w-8 ${s.accent}`} />
                <div>
                  <p className="text-2xl font-bold">{loading ? "—" : s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              {uniqueStatuses.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Cities</SelectItem>
              {uniqueCities.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search name, city, category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <span className="text-sm text-muted-foreground ml-auto">
            Showing {filteredLeads.length} of {leads.length} leads
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && leads.length === 0 && (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        )}

        {/* Table */}
        {!error && (!loading || leads.length > 0) && (
          <div className="rounded-lg border border-border overflow-hidden">
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    {([
                      ["businessName", "Business"],
                      ["category", "Category"],
                      ["rating", "Rating"],
                      ["status", "Status"],
                      ["emailStatus", "Email"],
                    ] as [SortKey, string][]).map(([key, label]) => (
                      <TableHead
                        key={key}
                        className="cursor-pointer select-none whitespace-nowrap"
                        onClick={() => toggleSort(key)}
                      >
                        {label}
                        {sortKey === key && (
                          <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
                        )}
                      </TableHead>
                    ))}
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                        No leads found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredLeads.map((lead, i) => (
                    <TableRow
                      key={i}
                      className="cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {lead.photoUrl && (
                            <img
                              src={lead.photoUrl}
                              alt=""
                              className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          )}
                          <div>
                            <p className="font-medium">{lead.businessName}</p>
                            <p className="text-xs text-muted-foreground">{lead.city}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {lead.category}
                      </TableCell>
                      <TableCell>
                        {lead.rating !== null ? (
                          <span className={`text-sm font-medium ${getRatingColor(lead.rating)}`}>
                            {lead.rating.toFixed(1)} <Star className="inline h-3.5 w-3.5 -mt-0.5" />
                            {lead.reviews !== null && (
                              <span className="text-muted-foreground ml-1">({lead.reviews})</span>
                            )}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(lead.status)}`}
                        >
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {lead.emailStatus?.toUpperCase() === "RECEIVING" ? (
                          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            Receiving
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                            {lead.emailStatus || "—"}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          {lead.website && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <a href={lead.website} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {lead.previewUrl && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <a href={lead.previewUrl} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {lead.email && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => copyEmail(lead.email)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        )}
      </main>

      {/* Detail Side Panel */}
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
                  <img
                    src={selectedLead.photoUrl}
                    alt={selectedLead.businessName}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}

                {/* Rating & Status */}
                <div className="flex items-center gap-4">
                  {selectedLead.rating !== null && (
                    <span className={`text-lg font-semibold ${getRatingColor(selectedLead.rating)}`}>
                      {selectedLead.rating.toFixed(1)} <Star className="inline h-4 w-4 -mt-0.5" />
                      {selectedLead.reviews !== null && (
                        <span className="text-sm text-muted-foreground ml-1">
                          ({selectedLead.reviews} reviews)
                        </span>
                      )}
                    </span>
                  )}
                  <Badge variant="outline" className={getStatusColor(selectedLead.status)}>
                    {selectedLead.status}
                  </Badge>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Contact</h3>
                  {selectedLead.phone && (
                    <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {selectedLead.phone}
                    </a>
                  )}
                  {selectedLead.email && (
                    <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {selectedLead.email}
                    </a>
                  )}
                  {selectedLead.fullAddress && (
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      {selectedLead.fullAddress}
                    </p>
                  )}
                  {selectedLead.website && (
                    <a href={selectedLead.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      {selectedLead.website}
                    </a>
                  )}
                </div>

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
                      <a href={selectedLead.previewUrl} target="_blank" rel="noopener noreferrer">
                        Open Preview →
                      </a>
                    </Button>
                  )}
                </div>

                {/* Notes */}
                {selectedLead.notes && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notes</h3>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">
                      {selectedLead.notes}
                    </p>
                  </div>
                )}

                {/* Open in Sheets */}
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href="https://docs.google.com/spreadsheets/d/1LbFulV5XzbCUHc1mn5uWo9Dt65T60fFJaH9yq4ZcvwY/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
