# Kino sayti + Telegram bot (bitta loyiha)

Bu — bitta React/Vite loyihasi bo'lib, ichida saytning o'zi ham, uni Telegram bilan
bog'laydigan bot ham bor (`bot/bot.js`). Ikkalasi ham bitta `.env` fayldagi TMDB
API kalitidan foydalanadi, shuning uchun sayt va bot bir xil kinolarni ko'rsatadi.

## Tuzilishi

```
├── src/             → sayt kodi (React sahifalar, komponentlar)
├── bot/
│   └── bot.js       → Telegram bot
├── .env             → barcha kalitlar (TMDB, bot tokeni, sayt manzili)
└── package.json
```

Saytdagi har bir kino sahifasi `/movie/<KOD>` ko'rinishida ochiladi — o'sha `<KOD>`
(TMDB ID) botga yuborilganda ham xuddi shu kino haqida ma'lumot qaytadi.

## O'rnatish

```bash
npm install
```

`.env` faylini oching va `TELEGRAM_BOT_TOKEN` qatoriga @BotFather dan olingan
tokeningizni yozing (Telegramda @BotFather ga yozib `/newbot` buyrug'ini yuboring).

## Ishga tushirish

**Sayt:**
```bash
npm run dev
```

**Telegram bot** (alohida terminalda):
```bash
npm run bot
```

Botga `/start` yuboring, so'ng kino kodini (masalan `550`) yoki kino nomini yozib
ko'ring. Kod bilmasa — nom bo'yicha qidirsa ham bo'ladi, bot mos kinolarni kodlari
bilan ko'rsatadi.

## Botni doimiy ishlab turishi uchun

Oddiy `npm run bot` faqat terminal ochiq turgandagina ishlaydi. Doimiy (24/7) ishlashi
uchun Railway.app yoki Render.com kabi bepul/arzon serverga joylashtiring:
- Start buyrug'i: `npm run bot`
- Environment Variables bo'limiga `.env` dagi qiymatlarni qo'shing
- Yoki o'z serveringizda: `npm install -g pm2 && pm2 start bot/bot.js --name kino-bot`

Sayt tayyor bo'lib internetga joylashtirilgach, uning manzilini `.env` dagi
`SITE_URL` ga yozing — bot xabarlariga saytdagi kino sahifasiga havola ham qo'shiladi.
