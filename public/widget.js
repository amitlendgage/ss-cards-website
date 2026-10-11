(function () {
  var s = document.currentScript;
  var WA = (s && s.dataset.whatsapp) || '918957537747'; // country code + number, no + or spaces
  var API = (s && s.dataset.api) || (s && s.src ? new URL(s.src).origin + '/api/chat' : '/api/chat');

  var css = '.ssc,.ssc *{box-sizing:border-box;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
  '.ssc{position:fixed;right:16px;bottom:16px;z-index:2147483000;display:flex;flex-direction:column;align-items:flex-end;gap:12px}' +
  '.ssc-wa{width:52px;height:52px;border-radius:50%;background:#25D366;display:grid;place-items:center;box-shadow:0 4px 14px rgba(0,0,0,.25)}' +
  '.ssc-wa svg{width:28px;height:28px;fill:#fff}' +
  '.ssc-open{position:relative;height:48px;padding:0 20px;border:0;border-radius:10px;background:#12263F;color:#fff;font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25)}' +
  '.ssc-open:before{content:"";position:absolute;top:6px;left:50%;width:16px;height:4px;margin-left:-8px;border-radius:2px;background:#F2A900}' +
  '.ssc-open span{display:block;padding-top:6px}' +
  '.ssc-panel{display:none;flex-direction:column;width:min(360px,calc(100vw - 32px));height:min(520px,calc(100vh - 150px));background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 10px 36px rgba(0,0,0,.3)}' +
  '.ssc-panel.on{display:flex}' +
  '.ssc-head{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:#12263F;color:#fff;border-bottom:3px solid #F2A900}' +
  '.ssc-head b{display:block;font-size:15px}.ssc-head small{opacity:.75;font-size:12px}' +
  '.ssc-x{background:none;border:0;color:#fff;font-size:22px;line-height:1;cursor:pointer}' +
  '.ssc-msgs{flex:1;overflow:auto;padding:14px;background:#F2F4F7;display:flex;flex-direction:column;gap:8px}' +
  '.ssc .m{max-width:85%;padding:9px 12px;border-radius:12px;font-size:14px;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere}' +
  '.ssc .m.b{align-self:flex-start;background:#fff;color:#1b2430;border:1px solid #dde3ea}' +
  '.ssc .m.u{align-self:flex-end;background:#12263F;color:#fff}' +
  '.ssc .typing{animation:sscp 1s infinite}@keyframes sscp{50%{opacity:.3}}' +
  '.ssc-chips{display:flex;flex-wrap:wrap;gap:6px}' +
  '.ssc-chip{border:1px solid #12263F;background:#fff;color:#12263F;border-radius:16px;padding:6px 11px;font-size:13px;cursor:pointer}' +
  '.ssc-bar{display:flex;gap:8px;padding:10px;border-top:1px solid #dde3ea;background:#fff}' +
  '.ssc-in{flex:1;min-width:0;border:1px solid #c5ced8;border-radius:8px;padding:9px 10px;font-size:14px}' +
  '.ssc-go{border:0;border-radius:8px;padding:0 14px;background:#F2A900;color:#12263F;font-weight:700;cursor:pointer}' +
  '.ssc button:focus-visible,.ssc a:focus-visible,.ssc input:focus-visible{outline:2px solid #F2A900;outline-offset:2px}' +
  '@media (prefers-reduced-motion:reduce){.ssc .typing{animation:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; }
  var hist = [], busy = false, greeted = false;

  var root = el('div', 'ssc');
  var panel = el('div', 'ssc-panel');
  var head = el('div', 'ssc-head');
  var ht = el('div'); ht.appendChild(el('b', '', 'S S Cards Technology')); ht.appendChild(el('small', '', 'Ask about cards, lanyards, RFID & printers'));
  var x = el('button', 'ssc-x', '\u00d7'); x.setAttribute('aria-label', 'Close chat');
  head.appendChild(ht); head.appendChild(x);
  var msgs = el('div', 'ssc-msgs'); msgs.setAttribute('aria-live', 'polite');
  var chips = el('div', 'ssc-chips');
  var bar = el('div', 'ssc-bar');
  var input = el('input', 'ssc-in'); input.type = 'text'; input.placeholder = 'Type your question\u2026'; input.maxLength = 500; input.setAttribute('aria-label', 'Your message');
  var go = el('button', 'ssc-go', 'Send');
  bar.appendChild(input); bar.appendChild(go);
  panel.appendChild(head); panel.appendChild(msgs); panel.appendChild(bar);

  var wa = el('a', 'ssc-wa');
  wa.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent('Hello, I want to enquire about your cards.');
  wa.target = '_blank'; wa.rel = 'noopener'; wa.setAttribute('aria-label', 'Chat on WhatsApp');
  wa.innerHTML = '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
  var open = el('button', 'ssc-open'); open.appendChild(el('span', '', 'Chat with us'));

  root.appendChild(panel); root.appendChild(wa); root.appendChild(open);
  document.body.appendChild(root);

  function add(role, text) {
    var m = el('div', 'm ' + (role === 'user' ? 'u' : 'b'), text);
    msgs.insertBefore(m, chips.parentNode === msgs ? chips : null);
    msgs.scrollTop = msgs.scrollHeight; return m;
  }

  async function send(text) {
    text = (text || '').trim(); if (!text || busy) return;
    if (chips.parentNode) chips.parentNode.removeChild(chips);
    add('user', text); hist.push({ role: 'user', content: text }); input.value = '';
    busy = true; var t = add('assistant', '\u2026'); t.classList.add('typing');
    try {
      var r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: hist }) });
      var d = await r.json(); if (!r.ok) throw new Error(d.error || 'error');
      t.classList.remove('typing'); t.textContent = d.reply; hist.push({ role: 'assistant', content: d.reply });
    } catch (e) {
      t.classList.remove('typing'); t.textContent = 'Reply nahi aa paya. Please WhatsApp button dabayein ya call karein: 07942798451.'; hist.pop();
    }
    busy = false; msgs.scrollTop = msgs.scrollHeight;
  }

  function toggle(show) {
    panel.classList.toggle('on', show);
    open.style.display = show ? 'none' : '';
    if (show) {
      if (!greeted) {
        greeted = true;
        add('assistant', 'Namaste! Main S S Cards Technology ka assistant hoon. PVC cards, lanyards, RFID cards ya printers ke baare mein poochiye.');
        ['Show products', 'Get a quote', 'Address & contact'].forEach(function (q) {
          var c = el('button', 'ssc-chip', q); c.onclick = function () { send(q); }; chips.appendChild(c);
        });
        msgs.appendChild(chips);
      }
      input.focus();
    }
  }
  window.SSChat = { open: function () { toggle(true); } };
  open.onclick = function () { toggle(true); };
  x.onclick = function () { toggle(false); };
  go.onclick = function () { send(input.value); };
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(input.value); });
})();
