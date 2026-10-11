# S S Cards website + WhatsApp + AI chat

## Deploy on Vercel
1. Upload this folder to a GitHub repo (or run `npx vercel` inside it).
2. In Vercel > Project > Settings > Environment Variables add:
   - ANTHROPIC_API_KEY = your key from console.anthropic.com
   - (optional) ALLOWED_ORIGIN = https://www.sscardstechnology.com
   - (optional) ANTHROPIC_MODEL = claude-haiku-5-5
3. Deploy. Open https://YOUR-PROJECT.vercel.app to test.

## Add to a website
<script src="https://YOUR-PROJECT.vercel.app/widget.js" data-whatsapp="918957537747"></script>

Put it before </body>. data-whatsapp = country code + number, no + or spaces.

## Change company answers
Edit the SYSTEM text in api/chat.js.
