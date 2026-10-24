# Transparent Soul Protocol (TSP)

*Maintained by Yasshare* | *Codename:* http://ktp.bot.ai | *Status:* Draft v0.1

TSP is an open protocol for AI/Bot identity verification.

Websites can't distinguish whether a visitor is human or AI/Bot. This protocol solves it.

### How it works
1.  *Self (keypair)* - Bot generates its own key
2.  *Soul (Verifiable credential at http://ktp.bot.ai/id)* - Official ID card
3.  *Body (Protocol that verifies the KTP)* - Verification system

Result: Verification in 0.1s, No Manual Approval

### Header Example
X-TSP-ID: ktp.bot.ai/soul_abc123
X-TSP-Timestamp: 1714123456
X-TSP-Nonce: random_string
X-TSP-Signature: sign(method+uri+timestamp+nonce)
---
Built by Yasshare - http://ktp.bot.ai
