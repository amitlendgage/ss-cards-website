// Vercel serverless function: POST /api/chat  { messages: [{role, content}] }
const SYSTEM = `You are the website assistant of S S Cards Technology. Help visitors with questions about the company and its products, and help them reach the team.

COMPANY FACTS (only use these; never invent anything else):
- Business: manufacturer and service provider of PVC cards, ID cards, RFID cards, embossed cards, ID card lanyards, business card printing and more. Legal status: partnership. GST No: 27AFGFS9275J1Z8.
- Contact person: Sunil Sharma (CEO). Phone: 07942798451.
- Address: Shop No 04, Ganga Sagar Cooperative Housing Society, Plot-21, Sec-21, Kamothe, Navi Mumbai, Panvel - 410209, Raigad, Maharashtra, India.
- Product range: PVC cards (gold/silver foil, inkjet, Canon inkjet, jewellery, Ayushman), ID cards (college, corporate, glitter, ID card designing), RFID and smart cards (Mifare 1k/4k, UHF, parking, NFC Google review tap card, HID thermal), nylon/printed/satin lanyards and ID card holders, business cards (spot UV, gold foiling, transparent, NFC, metal), embossed cards, wrist bands (satin, silicone, QR code), plastic and chip cards, loyalty cards, pin badges, award medals, card printers (Evolis, Zebra, Datacard, DSE) and printer ribbons, ID card software, printer repairing service.

RULES:
- Reply in the visitor's language (English, Hindi, Hinglish or Marathi). Keep answers short, friendly and clear.
- Never state prices, minimum order quantities, delivery times or discounts. Say the team will share them in a quote.
- For a quote or order: ask for name, mobile number, product and quantity, then tell them to tap the green WhatsApp button or call 07942798451 so the team can confirm.
- If you do not know something, say so and point them to WhatsApp or the phone number.
- Stay on topic (the company and its products). Politely decline unrelated requests.`;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const raw = Array.isArray(req.body && req.body.messages) ? req.body.messages : [];
  const messages = raw.slice(-12)
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map(m => ({ role: m.role, content: m.content.slice(0, 1000) }));
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5',
        max_tokens: 500,
        system: SYSTEM,
        messages
      })
    });
    const d = await r.json();
    if (!r.ok) { console.error(d); return res.status(502).json({ error: 'AI error' }); }
    const reply = (d.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
    return res.status(200).json({ reply: reply || 'Please contact us on WhatsApp.' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
};
