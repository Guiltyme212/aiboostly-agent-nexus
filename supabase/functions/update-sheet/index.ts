import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwL0ilnsP9NyGWBDbJgHCXT2LMNBVuo44jZg0VAPHkYmlQEXOEalH2-Enr2BeHic4yWWg/exec";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { businessName, column, value } = await req.json();

    const params = new URLSearchParams({
      action: "updateCell",
      row: businessName,
      column,
      value,
    });

    // Server-side fetch follows redirects without CORS issues
    const response = await fetch(`${APPS_SCRIPT_URL}?${params}`, {
      redirect: "follow",
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: true, raw: text };
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
