const HTML=`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>TSP v0.3-10s</title><style>body{background:#0a0a0a;color:#fff;font-family:sans-serif;padding:16px} .card{background:#1a1a1a;border-radius:12px;padding:16px;margin:12px 0;border:1px solid #333} input{width:100%;padding:12px;background:#000;color:#0f0;border:1px solid #0f0;border-radius:8px;margin:8px 0} button{width:100%;padding:12px;background:#0f0;color:#000;font-weight:bold;border:none;border-radius:8px} .ok{color:#0f0} .err{color:#f44} code{word-break:break-all;background:#000;padding:4px;display:block}</style></head><body>
<h2>🧬 Transparent Soul Protocol<br><small>v0.3-10s by Yasshare | Cikarang 2026</small></h2>
<div class="card"><h3>Apa Itu TSP v0.3?</h3>KTP Transparan untuk Bot/AI Agent. <b>v0.3-10s</b>: Ed25519 + Timestamp 10 detik anti-replay.<br><br><b>KTP:</b> K:Knowledge T:Trust P:Provenance<br>Logic: <code>Ed25519 VERIFY + CHECK 10s WINDOW</code></div>
<div class="card"><h3>Verifikasi KTP Bot v0.3</h3><input id="soul" placeholder="Token Soul (pubkey base64url)"><input id="sig" placeholder="Signature"><input id="ts" placeholder="Timestamp ms"><button onclick="verify()">VERIFIKASI v0.3-10s</button><pre id="out"></pre></div>
<div class="card"><h3>Buat KTP Bot v0.3 (Ed25519)</h3><button onclick="gen()">GENERATE KEYPAIR Ed25519</button><pre id="genOut"></pre></div>
<script>
async function verify(){
  const soul=document.getElementById('soul').value.trim(),sig=document.getElementById('sig').value.trim(),ts=document.getElementById('ts').value.trim();
  const r=await fetch(\`/?soul=\${encodeURIComponent(soul)}&sig=\${encodeURIComponent(sig)}&ts=\${encodeURIComponent(ts)}&t=\${Date.now()}\`);
  const j=await r.json();
  document.getElementById('out').textContent=JSON.stringify(j,null,2);
}
async function gen(){
  const kp=await crypto.subtle.generateKey({name:"Ed25519"},true,["sign","verify"]);
  const pub=await crypto.subtle.exportKey("raw",kp.publicKey);
  const toB64u=b=>btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\\+/g,'-').replace(/\\//g,'_').replace(/=/g,'');
  document.getElementById('genOut').textContent="PUBKEY (Soul):\\n"+toB64u(pub)+"\\n\\nGunakan di client untuk sign: soul_auth:\${timestamp}\\nPrivKey disimpan di browser saja!";
}
</script></body></html>`;

export default {
  async fetch(request){
    const url=new URL(request.url);
    const soul=url.searchParams.get('soul'),sig=url.searchParams.get('sig'),ts=url.searchParams.get('ts');
    const cors={"Access-Control-Allow-Origin":"*","Content-Type":"application/json"};
    if(request.method==="OPTIONS") return new Response(null,{headers:cors});
    if(!soul||!sig||!ts){
      return new Response(HTML,{headers:{"Content-Type":"text/html"}});
    }
    try{
      const now=Date.now(),diff=Math.abs(now-parseInt(ts));
      if(diff>10000) throw new Error(`Expired ${diff}ms > 10s - REPLAY ATTACK`);
      const d=s=>{let b=s.replace(/-/g,'+').replace(/_/g,'/');while(b.length%4)b+='=';return Uint8Array.from(atob(b),c=>c.charCodeAt(0))};
      const key=await crypto.subtle.importKey("raw",d(soul),{name:"Ed25519"},false,["verify"]);
      const ok=await crypto.subtle.verify("Ed25519",key,d(sig),new TextEncoder().encode(`soul_auth:${ts}`));
      if(!ok) throw new Error("Invalid Signature Ed25519");
      return new Response(JSON.stringify({valid:true,protocol:"Transparent Soul Protocol",version:"v0.3-10s",mode:"Ed25519 + 10s Clock",latency_ms:diff,owner:"Yasshare-Cikarang"}),{headers:cors});
    }catch(e){
      return new Response(JSON.stringify({valid:false,version:"v0.3-10s",error:e.message}),{headers:cors,status:400});
    }
  }
}
