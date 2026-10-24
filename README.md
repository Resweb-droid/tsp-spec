# 🧬 Transparent Soul Protocol (TSP) - Draft v0.1
**Maintained by Yasshare | Cikarang - Indonesia, 2026**
**Live: https://tsp.yassergeyasser.workers.dev**
**Codename: ktp.bot.ai**

TSP is an open protocol for AI/Bot identity verification.
Websites can't distinguish whether a visitor is human or AI/Bot. This protocol solves it.

### How it works
1. **Self (keypair)** - Bot generates its own key (32-byte)
2. **Soul (Verifiable credential at /?soul=TOKEN)** - Official ID card
3. **Body (Protocol that verifies the KTP)** - Verification system: `DECODE Base64URL -> CHECK 32 Byte -> valid:true`

Result: Verification in 0.1s, No Manual Approval, No Database

### KTP = Knowledge, Trust, Provenance
- K: Knowledge - Untuk Mengetahui identitas bot
- T: Trust - Untuk Mempercayai lewat verifikasi math
- P: Provenance - Untuk Melacak asal-usul & owner

### Live Verification Example
https://tsp.yassergeyasser.workers.dev/?soul=WWFzc2hhcmUtQ2lrYXJhbmctSW5kb25lc2lhLTIwMjY

Returns:
```json
{"valid":true, "protocol":"Transparent Soul Protocol", "owner":"Yasshare"}
