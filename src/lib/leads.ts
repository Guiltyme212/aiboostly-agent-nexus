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

// Column indices (0-based) matching the Google Sheet layout
// A=0 Status, B=1 Website, C=2 (skip), D=3 Business Name, E=4 Rating, F=5 Reviews,
// G=6 Email, H=7 Email Status, I=8 City (was "Preview URL" header?), J=9 Notes(?),
// But actual mapping from the CSV response shows different order due to gviz output.
// We'll use a header-matching approach that's more resilient.

function findHeaderIndex(headers: string[], ...keywords: string[]): number {
  for (const kw of keywords) {
    const idx = headers.findIndex(
      (h) => h.toLowerCase().startsWith(kw.toLowerCase())
    );
    if (idx !== -1) return idx;
  }
  return -1;
}

function safeGet(row: string[], idx: number): string {
  return idx >= 0 && idx < row.length ? (row[idx] ?? "").trim() : "";
}

export async function fetchLeads(): Promise<Lead[]> {
  const res = await fetch(SHEET_CSV_URL);
  if (!res.ok) throw new Error("Failed to fetch sheet");
  const text = await res.text();

  const parsed = Papa.parse<string[]>(text, {
    header: false,
    skipEmptyLines: true,
  });

  if (parsed.data.length < 2) return [];

  // First row contains headers (possibly merged with first data value in gviz format)
  const headerRow = parsed.data[0];

  // Build column index map by matching header prefixes
  const col = {
    status: findHeaderIndex(headerRow, "Status"),
    website: findHeaderIndex(headerRow, "Website"),
    businessName: findHeaderIndex(headerRow, "Business Name"),
    rating: findHeaderIndex(headerRow, "Rating"),
    reviews: findHeaderIndex(headerRow, "Reviews"),
    email: findHeaderIndex(headerRow, "Email "),  // space to avoid matching "Email Status" or "Email Draft"
    emailStatus: findHeaderIndex(headerRow, "Email Status"),
    city: findHeaderIndex(headerRow, "City"),
    notes: findHeaderIndex(headerRow, "Notes"),
    previewUrl: findHeaderIndex(headerRow, "Preview URL"),
    phone: findHeaderIndex(headerRow, "Phone"),
    fullAddress: findHeaderIndex(headerRow, "Full Address"),
    category: findHeaderIndex(headerRow, "Category"),
    subtypes: findHeaderIndex(headerRow, "Subtypes"),
    photoUrl: findHeaderIndex(headerRow, "Photo URL"),
    logoUrl: findHeaderIndex(headerRow, "Logo URL"),
  };

  // If we can't find headers via prefix matching, fall back to known column positions
  // A=0, B=1, D=3, E=4, F=5, G=6, H=7, I=8, J=9, K=10, P=15, Q=16, T=19, U=20, Z=25, AA=26
  const fallback = {
    status: 0,
    website: 1,
    businessName: 3,
    rating: 4,
    reviews: 5,
    email: 6,
    emailStatus: 7,
    city: 8,
    notes: 9,
    previewUrl: 10,
    phone: 15,
    fullAddress: 16,
    category: 19,
    subtypes: 20,
    photoUrl: 25,
    logoUrl: 26,
  };

  // Use header-based mapping if enough headers found, otherwise fallback
  const headersFound = Object.values(col).filter((v) => v !== -1).length;
  const mapping = headersFound >= 8 ? col : fallback;

  // Data rows start at index 1 (skip header row)
  return parsed.data.slice(1).map((row) => ({
    status: safeGet(row, mapping.status),
    website: safeGet(row, mapping.website),
    businessName: safeGet(row, mapping.businessName),
    rating: parseNum(safeGet(row, mapping.rating)),
    reviews: parseNum(safeGet(row, mapping.reviews))
      ? Math.round(parseNum(safeGet(row, mapping.reviews))!)
      : null,
    email: safeGet(row, mapping.email),
    emailStatus: safeGet(row, mapping.emailStatus),
    city: safeGet(row, mapping.city),
    notes: safeGet(row, mapping.notes),
    previewUrl: safeGet(row, mapping.previewUrl),
    phone: safeGet(row, mapping.phone),
    fullAddress: safeGet(row, mapping.fullAddress),
    category: safeGet(row, mapping.category),
    subtypes: safeGet(row, mapping.subtypes),
    photoUrl: safeGet(row, mapping.photoUrl),
    logoUrl: safeGet(row, mapping.logoUrl),
  })).filter((l) => l.businessName.trim() !== "");
}
