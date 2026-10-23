export default {
  async fetch(request) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    };
    const url = new URL(request.url);
    const spore = url.searchParams.get("spore") || "";

    if (spore.length < 40 || spore.length > 50) {
      return new Response(JSON.stringify({ valid: false }), { headers: cors });
    }

    try {
      let b64 = spore.replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4 !== 0) {
        b64 += "=";
      }
      const bin = atob(b64);
      if (bin.length !== 32) {
        return new Response(JSON.stringify({ valid: false }), { headers: cors });
      }
      return new Response(JSON.stringify({ valid: true, protocol: "TSP" }), { headers: cors });
    } catch (e) {
      return new Response(JSON.stringify({ valid: false }), { headers: cors });
    }
  }
}
