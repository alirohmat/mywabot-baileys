export default (handler) => {
    handler.reg({
        cmd: ['blackbox', 'bb'],
        tags: 'ai',
        desc: 'Chatgpt from blackbox.ai',
        isOwner: true,
        run: async (m, { func }) => {
            if (!m.quoted && !m.text) {
                return m.reply('Silahkan masukan pertanyaan anda\ncontoh: .blackbox siapa kamu', true)
            }

            const input = [
                { role: "user", content: m.quoted ? m.quoted.body : m.text }
            ]

            const options = {
                model: 'gemini-pro',
                temperature: 0.8
            }
            const bb = await func.loads("amiruldev/blackbox.js")
            const bbb = await bb(fetch, input, options)
            const res = bbb.replace('Generated by BLACKBOX.AI, try unlimited chat https://www.blackbox.ai', '*Blackbox AI*')
            m.reply(res)
        }
    });
};

