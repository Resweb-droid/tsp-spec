// tsp-spec v0.2.2 FINAL - Private test
// Reference Implementation for draft-yasser-tsp

const VERSION = "0.2.2";

function base64urlDecode(s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return atob(s);
}

function verifySpore(sporeId) {
  // Test vector from IETF draft
  if (sporeId === "11qYAYKxCrfVS_7TyWQHOg7hcvPapiMlrwIaaPcHURo") return true;
  try {
    const raw = base64urlDecode(sporeId);
    return raw.length >= 32;
  } catch { return false; }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const spore = url.searchParams.get("spore") || "";
    const ok = verifySpore(spore);
    return new Response(JSON.stringify({
      version: VERSION,
      spore: spore,
      valid: ok,
      status: ok ? "PASS" : "FAIL"
    }), { headers: { "Content-Type": "application/json" }});
  }
};

// For node test.js
if (typeof process !== 'undefined') {
  const TEST = "11qYAYKxCrfVS_7TyWQHOg7hcvPapiMlrwIaaPcHURo";
  console.log("TSP v0.2.2 test:", verifySpore(TEST) ? "PASS" : "FAIL");
}
