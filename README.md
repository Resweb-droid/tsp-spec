# Transparent Soul Protocol (TSP) v0.3

> KTP Transparan untuk Bot & AI Agent

Live Demo: https://tsp.yassergeyasser.workers.dev
Built from Cikarang.

### v0.3 - Single Soul (LIVE NOW)
- 1x Ed25519 Keypair
- Soul = base64url(pubkey)
- Auth: `sign(soul_auth:timestamp)` 
- Verify window: 10s
- Status: ✅ Live di Cloudflare Workers

### v0.4 - Triple Soul (NEXT)
- 3x Ed25519 Keypair (K1=Identity, K2=Recovery, K3=Encrypt)
- Auth Flow:
    1. Server generates 3 random nonce (32 byte)
    2. Server shuffles order
    3. Client signs all 3 nonce + timestamp with respective keys
    4. Server verifies all 3 within 10s window
- Security: Anti-replay, single-key compromise safe
- Status: 🔨 In Progress

### v0.5 - Quint Soul (FUTURE)
- 5x Ed25519 Keypair distributed
- Auth: 3-of-5 Threshold Random Challenge
- Server randomly picks 3 out of 5 keys each login
- Features:
    - Lose 2 keys still can auth
    - Distributed storage (HP, Laptop, Paper, Partner, Vault)
    - Attacker needs to compromise 3 different locations in <10s
- Security: Threshold Identity, Distributed Trust
- Status: 📝 Planned

## Kenapa bukan OTP?
OTP = rahasia bersama, sekali pakai.
TSP = identitas publik yang bisa dibuktikan, anti-replay, bisa threshold.

## Tech Stack
- Ed25519, X25519
- Cloudflare Workers
- No SMS, No Biaya OTP
