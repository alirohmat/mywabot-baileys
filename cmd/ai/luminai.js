import axios from 'axios'
// pr from @Abuzzpoet
export default (handler) => {
  handler.reg({
    cmd: ['lumin', 'luminai'],
    tags: 'ai',
    desc: 'Lumin AI',
    isLimit: true,
    run: async (m) => {
      if (!m.quoted && !m.text) {
        return m.reply('Silahkan masukan pertanyaan anda\ncontoh: .lumin siapa kamu', true)
      }
      async function fetchUser(content, user) {
        try {
          const response = await axios.post('https://luminai.my.id/', {
            content: content,
            user: user,
          })

          return response.data.result
        } catch (error) {
          return error
        }
      }

      try {
        const budy = m.quoted ? m.quoted.body : m.text
        const userId = m.sender
        const result = await fetchUser(budy, userId)
        const output = typeof result === 'object' ? JSON.stringify(result, null, 2) : result
        m.reply(output)
      } catch (error) {
        m.reply("Terjadi kesalahan dalam mendapatkan respons.", true)
      }
    },
  })
}
