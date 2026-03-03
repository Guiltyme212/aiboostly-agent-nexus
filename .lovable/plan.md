

## Plan: Fix Google Apps Script API Calls

The edge function proxy is deployed but the logs show no actual request handling — the requests may not be reaching it, or the Apps Script isn't processing them correctly. The user wants to switch to direct browser calls with a robust CORS fallback strategy.

### Changes in `src/pages/Admin.tsx`:

1. **Replace `updateSheet` function** (lines 84-99) with the user's provided implementation:
   - Direct browser `fetch` to the Apps Script URL (no edge function proxy)
   - `mode: 'cors'` with `redirect: 'follow'` as primary attempt
   - Opaque response detection → `no-cors` fallback
   - Full `no-cors` fire-and-forget as last resort
   - Console logging at every step for debugging
   - Business name sanitization: `businessName.split('\n')[0].trim()` to strip city subtitles

2. **Add `APPS_SCRIPT_URL` constant** at the top, replacing the edge function URL usage

3. **Add console logging** to the `handleCellUpdate` callback (around line 548) so status changes are traceable:
   - Log the business name and new value before calling `updateSheet`

4. **No changes needed to callers** — `handleCellUpdate` already wraps `updateSheet` with optimistic updates and error handling; the new `updateSheet` returns `boolean` which is compatible

### What stays the same:
- All column definitions, StatusCell, NotesCell components
- Optimistic update logic in `handleCellUpdate`
- Toast notifications on success/failure
- The edge function file remains (unused but harmless)

