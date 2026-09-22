import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import axios from 'axios'

const {
  TELEGRAM_BOT_TOKEN,
  TMDB_API_KEY,
  TMDB_BASE_URL = 'https://api.themoviedb.org/3',
  TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p',
  SITE_URL = '',
} = process.env

if (!TELEGRAM_BOT_TOKEN) {
  console.error('Xato: .env faylida TELEGRAM_BOT_TOKEN ko\'rsatilmagan.')
  process.exit(1)
}
if (!TMDB_API_KEY) {
  console.error('Xato: .env faylida TMDB_API_KEY ko\'rsatilmagan.')
  process.exit(1)
}

const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  params: { api_key: TMDB_API_KEY, language: 'en-US' },
})

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true })

const posterUrl = (path) => (path ? `${TMDB_IMAGE_URL}/w500${path}` : null)

const formatMovieCaption = (movie) => {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "noma'lum"
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "noma'lum"
  const genres = (movie.genres || []).map((g) => g.name).join(', ') || "noma'lum"
  const overview = movie.overview || "Tavsif mavjud emas."

  let text =
    `🎬 *${movie.title}* (${year})\n\n` +
    `⭐ Reyting: ${rating}/10\n` +
    `🎭 Janr: ${genres}\n\n` +
    `${overview}`

  if (SITE_URL && !SITE_URL.includes('your-site-url')) {
    text += `\n\n🔗 [Saytda ko'rish](${SITE_URL}/movie/${movie.id})`
  }

  return text
}

// Kino kodi (TMDB ID) bo'yicha kino topib yuborish
async function sendMovieByCode(chatId, code) {
  try {
    const { data: movie } = await tmdb.get(`/movie/${code}`)
    const photo = posterUrl(movie.poster_path)
    const caption = formatMovieCaption(movie)

    if (photo) {
      await bot.sendPhoto(chatId, photo, { caption, parse_mode: 'Markdown' })
    } else {
      await bot.sendMessage(chatId, caption, { parse_mode: 'Markdown' })
    }
  } catch (err) {
    if (err.response?.status === 404) {
      await bot.sendMessage(
        chatId,
        `❌ "${code}" kodi bo'yicha kino topilmadi. Kodni tekshirib qayta yuboring.`
      )
    } else {
      console.error(err.message)
      await bot.sendMessage(chatId, "⚠️ Xatolik yuz berdi, birozdan so'ng qayta urinib ko'ring.")
    }
  }
}

// Nom bo'yicha qidiruv (raqam bo'lmagan matn kiritilsa)
async function searchMovieByTitle(chatId, query) {
  try {
    const { data } = await tmdb.get('/search/movie', { params: { query, include_adult: false } })
    const results = data.results || []

    if (results.length === 0) {
      await bot.sendMessage(chatId, `❌ "${query}" bo'yicha hech narsa topilmadi.`)
      return
    }

    const top = results.slice(0, 5)
    const lines = top.map((m) => {
      const year = m.release_date ? m.release_date.slice(0, 4) : "noma'lum"
      return `🎬 *${m.title}* (${year}) — kodi: \`${m.id}\``
    })

    await bot.sendMessage(
      chatId,
      `Topilgan natijalar:\n\n${lines.join('\n')}\n\nKerakli kinoning kodini (raqamini) yuboring, men to'liq ma'lumotini yuboraman.`,
      { parse_mode: 'Markdown' }
    )
  } catch (err) {
    console.error(err.message)
    await bot.sendMessage(chatId, "⚠️ Qidiruvda xatolik yuz berdi.")
  }
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Salom! 👋\n\nMenga kinoning *kodini* (raqamini) yuboring — men sizga o'sha kino haqida ma'lumot va rasmini yuboraman.\n\nAgar kodni bilmasangiz, kino nomini yozing — mos keladigan kinolarni va ularning kodlarini topib beraman.",
    { parse_mode: 'Markdown' }
  )
})

bot.onText(/\/kino (.+)/, (msg, match) => {
  const code = match[1].trim()
  sendMovieByCode(msg.chat.id, code)
})

bot.on('message', (msg) => {
  if (!msg.text || msg.text.startsWith('/')) return

  const text = msg.text.trim()
  const isCode = /^\d+$/.test(text)

  if (isCode) {
    sendMovieByCode(msg.chat.id, text)
  } else {
    searchMovieByTitle(msg.chat.id, text)
  }
})

bot.on('polling_error', (err) => console.error('Polling error:', err.message))

console.log('Bot ishga tushdi ✅')
