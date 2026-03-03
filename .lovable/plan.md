

## Why Status Updates Fail

From the network logs, the Apps Script call errors with **"Failed to fetch"**. There are three likely causes:

### 1. CORS (most likely)
Google Apps Script GET requests via `fetch()` from a browser hit CORS restrictions. The Apps Script must be deployed as:
- **Execute as:** Me
- **Who has access:** Anyone

Even then, Apps Script redirects the request through `script.googleusercontent.com`, and `fetch()` with `redirect: "follow"` often fails on the CORS preflight of the redirect.

**Fix:** Change `fetch` to use `mode: "no-cors"` — but then you can't read the response. The better pattern is to **not use GET with query params** but instead submit via a **form POST** or use the **JSONP workaround** (append a `<script>` tag). However the simplest reliable approach is:

- Use `fetch` in `no-cors` mode for fire-and-forget, and trust the optimistic UI update (the 60s auto-refresh will confirm).
- OR proxy the call through a backend function.

### 2. Apps Script not deployed / wrong URL
The URL may not be deployed yet, or may need redeployment after code changes. Each new deployment generates a new URL.

### 3. Apps Script code missing the `doGet` handler
The script needs a `doGet(e)` function that handles the `updateCell` action.

## Recommended Plan

**In `src/pages/Admin.tsx`**, update `updateSheet` to use `mode: "no-cors"`:

```typescript
async function updateSheet(businessName: string, column: string, value: string) {
  const params = new URLSearchParams({
    action: "updateCell",
    row: businessName,
    column,
    value,
  });
  // no-cors avoids CORS redirect issues with Apps Script
  await fetch(`${APPS_SCRIPT_URL}?${params}`, {
    redirect: "follow",
    mode: "no-cors",
  });
  // Can't read response in no-cors mode, so we trust the update
  // The 60s auto-refresh will sync actual state from the sheet
}
```

Update the callers to not expect a response — just catch network errors and show appropriate toasts. The optimistic UI update already handles the immediate visual feedback, and the auto-refresh confirms the real state.

### Technical Details
- `mode: "no-cors"` returns an **opaque response** (status 0, empty body) but the request still goes through
- The current `response.json()` call on line 95 throws because the opaque response has no readable body — this is what causes the "Failed to fetch" error bubble
- Removing the `.json()` parsing and treating it as fire-and-forget fixes the issue without any backend changes
- Error toast should change to only show on actual network failures, not on response parsing

