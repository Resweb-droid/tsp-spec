export default {
  async fetch(request) {
    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "*"
        }
      });
    }

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    };
    const url = new URL(request.url);
    const soul = url.searchParams.get("soul") || "";

    if (soul.length < 40 || soul.length > 50) {
      return new Response(JSON.stringify({ valid: false }), { headers });
    }

    try {
      let b64 = soul.replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4 !== 0) b64 += "=";
      const bin = atob(b64);
      if (bin.length !== 32) {
        return new Response(JSON.stringify({ valid: false }), { headers });
      }
      return new Response(JSON.stringify({ valid: true, protocol: "Transparent Soul Protocol" }), { headers });
    } catch (e) {
      return new Response(JSON.stringify({ valid: false }), { headers });
    }
  }
}
