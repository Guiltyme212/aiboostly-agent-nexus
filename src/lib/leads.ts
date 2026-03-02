import Papa from "papaparse";

export interface Lead {
  status: string;
  website: string;
  businessName: string;
  rating: number | null;
  reviews: number | null;
  email: string;
  emailStatus: string;
  city: string;
  notes: string;
  previewUrl: string;
  phone: string;
  fullAddress: string;
  category: string;
  subtypes: string;
  photoUrl: string;
  logoUrl: string;
}

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1LbFulV5XzbCUHc1mn5uWo9Dt65T60fFJaH9yq4ZcvwY/gviz/tq?tqx=out:csv&sheet=Pipeline%20test";

export const STATUS_PRIORITY: Record<string, number> = {
  BUILDING: 0,
  DEPLOYING: 1,
  NEEDS_PREVIEW: 2,
  DEPLOYED: 3,
};

export const STATUS_COLORS: Record<string, string> = {
  NEEDS_PREVIEW: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  BUILDING: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  DEPLOYING: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  DEPLOYED: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export const DEFAULT_STATUS_COLOR = "bg-muted text-muted-foreground border-border";

export function getStatusColor(status: string): string {
  return STATUS_COLORS[status?.toUpperCase()] ?? DEFAULT_STATUS_COLOR;
}

export function getRatingColor(rating: number | null): string {
  if (rating === null) return "text-muted-foreground";
  if (rating >= 4.5) return "text-emerald-400";
  if (rating >= 3.5) return "text-amber-400";
  return "text-red-400";
}

function parseNum(val: string | undefined): number | null {
  if (!val) return null;
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
}

function mapRow(row: Record<string, string>): Lead {
  return {
    status: row["Status"] ?? "",
    website: row["Website"] ?? "",
    businessName: row["Business Name"] ?? "",
    rating: parseNum(row["Rating"]),
    reviews: parseNum(row["Reviews"])
      ? Math.round(parseNum(row["Reviews"])!)
      : null,
    email: row["Email"] ?? "",
    emailStatus: row["Email Status"] ?? "",
    city: row["City"] ?? "",
    notes: row["Notes"] ?? "",
    previewUrl: row["Preview URL"] ?? "",
    phone: row["Phone"] ?? "",
    fullAddress: row["Full Address"] ?? "",
    category: row["Category"] ?? "",
    subtypes: row["Subtypes / Services"] ?? "",
    photoUrl: row["Photo URL"] ?? "",
    logoUrl: row["Logo URL"] ?? "",
  };
}

export async function fetchLeads(): Promise<Lead[]> {
  const res = await fetch(SHEET_CSV_URL);
  if (!res.ok) throw new Error("Failed to fetch sheet");
  const text = await res.text();
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data.map(mapRow).filter((l) => l.businessName.trim() !== "");
}
