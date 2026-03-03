

## Plan: Add "Sheet Order" Reset Button

The table currently defaults to sorting by Status priority. The user wants a button to reset to the original Google Sheet row order (i.e., no sorting applied).

### Changes in `src/pages/Admin.tsx`:

1. **Add a "Sheet Order" button** next to the existing toolbar controls (near search/filter area)
2. When clicked, it clears the sorting state: `setSorting([])`
3. With an empty `SortingState`, TanStack Table returns rows in their original data order -- which matches the Google Sheet row order
4. Style it as a small button with an icon (e.g., a list/reorder icon from lucide-react like `ListOrdered` or `ArrowDownUp`)
5. Visually indicate when sheet order is active (sorting is empty) vs when a column sort is applied

### Technical Details

- `setSorting([])` removes all sorting, reverting to the data's natural order from `fetchLeads()` which preserves Google Sheet row order
- The button should be wrapped in `startTransition` for consistency with existing sort transitions
- Default sorting currently starts as `[{ id: "status", desc: false }]` -- the new button overrides this to `[]`

