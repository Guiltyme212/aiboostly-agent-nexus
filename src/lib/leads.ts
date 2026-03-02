import Papa from "papaparse";

export interface Lead {
  status: string;
  website: string;
  businessName: string;
  rating: number | null;
  reviews: number | null;
  email: string;
  emailStatus: string;
  emailDraft: string;
  city: string;
  notes: string;
  previewUrl: string;
  phone: string;
  fullAddress: string;
  postalCode: string;
  category: string;
  subtypes: string;
  photoUrl: string;
  logoUrl: string;
  websiteDescription: string;
  workingHours: string;
  cms: string;
  sentDate: string;
  response: string;
  contactName: string;
  facebook: string;
  instagram: string;
  googleMapsLink: string;
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

  const headerRow = parsed.data[0];

  const col = {
    status: findHeaderIndex(headerRow, "Status"),
    website: findHeaderIndex(headerRow, "Website"),
    businessName: findHeaderIndex(headerRow, "Business Name"),
    rating: findHeaderIndex(headerRow, "Rating"),
    reviews: findHeaderIndex(headerRow, "Reviews"),
    email: findHeaderIndex(headerRow, "Email "),
    emailStatus: findHeaderIndex(headerRow, "Email Status"),
    emailDraft: findHeaderIndex(headerRow, "Email Draft"),
    city: findHeaderIndex(headerRow, "City"),
    notes: findHeaderIndex(headerRow, "Notes"),
    previewUrl: findHeaderIndex(headerRow, "Preview URL"),
    phone: findHeaderIndex(headerRow, "Phone"),
    fullAddress: findHeaderIndex(headerRow, "Full Address"),
    postalCode: findHeaderIndex(headerRow, "Postal Code"),
    category: findHeaderIndex(headerRow, "Category"),
    subtypes: findHeaderIndex(headerRow, "Subtypes"),
    photoUrl: findHeaderIndex(headerRow, "Photo URL"),
    logoUrl: findHeaderIndex(headerRow, "Logo URL"),
    websiteDescription: findHeaderIndex(headerRow, "Website Description"),
    workingHours: findHeaderIndex(headerRow, "Working Hours"),
    cms: findHeaderIndex(headerRow, "CMS", "Generator"),
    sentDate: findHeaderIndex(headerRow, "Sent Date"),
    response: findHeaderIndex(headerRow, "Response"),
    contactName: findHeaderIndex(headerRow, "Contact Name"),
    facebook: findHeaderIndex(headerRow, "Facebook"),
    instagram: findHeaderIndex(headerRow, "Instagram"),
    googleMapsLink: findHeaderIndex(headerRow, "Google Maps"),
  };

  // Fallback column positions (0-based)
  const fallback = {
    status: 0,
    website: 1,
    businessName: 3,
    rating: 4,
    reviews: 5,
    email: 6,
    emailStatus: 7,
    emailDraft: -1,
    city: 8,
    notes: 9,
    previewUrl: 10,
    phone: 15,
    fullAddress: 16,
    postalCode: -1,
    category: 19,
    subtypes: 20,
    photoUrl: 25,
    logoUrl: 26,
    websiteDescription: -1,
    workingHours: -1,
    cms: -1,
    sentDate: -1,
    response: -1,
    contactName: -1,
    facebook: -1,
    instagram: -1,
    googleMapsLink: -1,
  };

  const headersFound = Object.values(col).filter((v) => v !== -1).length;
  const mapping = headersFound >= 8 ? col : fallback;

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
    emailDraft: safeGet(row, mapping.emailDraft),
    city: safeGet(row, mapping.city),
    notes: safeGet(row, mapping.notes),
    previewUrl: safeGet(row, mapping.previewUrl),
    phone: safeGet(row, mapping.phone),
    fullAddress: safeGet(row, mapping.fullAddress),
    postalCode: safeGet(row, mapping.postalCode),
    category: safeGet(row, mapping.category),
    subtypes: safeGet(row, mapping.subtypes),
    photoUrl: safeGet(row, mapping.photoUrl),
    logoUrl: safeGet(row, mapping.logoUrl),
    websiteDescription: safeGet(row, mapping.websiteDescription),
    workingHours: safeGet(row, mapping.workingHours),
    cms: safeGet(row, mapping.cms),
    sentDate: safeGet(row, mapping.sentDate),
    response: safeGet(row, mapping.response),
    contactName: safeGet(row, mapping.contactName),
    facebook: safeGet(row, mapping.facebook),
    instagram: safeGet(row, mapping.instagram),
    googleMapsLink: safeGet(row, mapping.googleMapsLink),
  })).filter((l) => l.businessName.trim() !== "");
}
