

## Plan: Admin Dashboard with Google Sheets CRM

### Build Errors to Fix First
The existing `faq-tabs.tsx` component lacks TypeScript types — its props are `any`/`unknown`. The `FAQ` component destructures `className` as required but `FAQ.tsx` doesn't pass it. These need fixing:
- Add proper TypeScript interfaces to `faq-tabs.tsx` component props
- Make `className` optional in the FAQ component

### New Dependencies
- **papaparse** + **@types/papaparse** — for CSV parsing

### New Files

**1. `src/pages/Admin.tsx`**
Main admin page component containing:
- Header with title "LeadPilot Dashboard ⚡", refresh button, last-refreshed timestamp
- Stats bar (4 cards): Total Leads, Deployed, Needs Preview, Building
- Filter bar: Status dropdown, City dropdown, search input, result count
- Leads table with sortable columns
- Side panel (Sheet) for lead details on row click
- Auto-refresh every 60 seconds
- CSV fetching from the Google Sheets URL via papaparse
- All state management with React hooks (useState, useEffect, useMemo)

**2. `src/lib/leads.ts`** (optional helper)
- TypeScript interface for Lead data
- CSV parsing logic, column mapping, status color mapping

### Route Addition
- Add `/admin` route in `App.tsx` above the catch-all, import Admin page

### Design Approach
- Dark theme using existing CSS variables (background, card, border, muted, primary)
- Existing shadcn components: Table, Badge, Card, Sheet, Select, Input, Button, ScrollArea, Skeleton
- Status badge colors via Tailwind classes (green/amber/purple/blue/gray)
- Rating stars colored by threshold
- Responsive but desktop-optimized layout

### Key Technical Details
- Fetch CSV via `fetch()`, parse with `Papa.parse`
- Column mapping by header name (not index) for resilience
- Sorting: default by status priority order, clickable headers toggle asc/desc
- Filters are combined (AND logic) with case-insensitive search
- Side panel uses existing Sheet component (slides from right)
- Error/loading/empty states handled gracefully

