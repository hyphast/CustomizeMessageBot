import { Markup, Telegraf, session, Scenes } from 'telegraf'

const { WizardScene, Stage } = Scenes

// const exitKeyboard = Markup.keyboard(['exit']).oneTime()
// const removeKeyboard = Markup.removeKeyboard()
//
// const photoHandler = Telegraf.on('photo', async (ctx) => {
//     const photoArr = ctx.update.message.photo
//     const caption = ctx.update.message.caption
//     const fileId = photoArr[photoArr.length - 1]['file_id']
//
//
//     ctx.scene.state.photo = { fileId, caption }
//
//
//     return ctx.wizard.next()
// })
// const targetChatHandler = Telegraf.on('text', async (ctx) => {
//     const TARGET_CHAT_ID = ctx.message.text
//
//     ctx.scene.state.target = TARGET_CHAT_ID
//
//     return ctx.wizard.next()
// })
// const inlineKeyboardNameHandler = Telegraf.on('text', async (ctx) => {
//     const PHOTO_CAPTION = ctx.message.text
//
//     ctx.scene.state.photoCaption = PHOTO_CAPTION
//
//     return ctx.wizard.next()
// })
// const inlineKeyboardURLHandler = Telegraf.on('text', async (ctx) => {
//     const PHOTO_URL = ctx.message.text
//
//     ctx.scene.state.photoURL = PHOTO_URL
//
//     ctx.telegram.sendPhoto(ctx.session.target, ctx.session.photo.fileId, {
//
//         caption: ctx.session.photo.caption,
//         reply_markup: { inline_keyboard: [
//
//                 [Markup.button.url(ctx.session.photoCaption, PHOTO_URL)],
//             ]}
//     })
//
//     return ctx.scene.leave()
// })
// const customizeMessageScene = new WizardScene('CustomizeMessageScene',
//     photoHandler, targetChatHandler,
//     inlineKeyboardNameHandler, inlineKeyboardURLHandler
// )
// customizeMessageScene.enter(ctx => ctx.reply('Загрузите сюда фото', exitKeyboard))
//
// const stage = new Stage([ customizeMessageScene ])
// stage.hears('exit', ctx => ctx.scene.leave())


const TOKEN = process.env.BOT_TOKEN ?? ''
if (TOKEN === '') {
    console.log('BOT_TOKEN must be provided!')
}
const bot = new Telegraf(TOKEN)

// bot.use(session(), stage.middleware())

bot.on('photo', (ctx) => {
    const photoArr = ctx.update.message.photo
    const caption = ctx.update.message.caption
    const fileId = photoArr[photoArr.length - 1]['file_id']
    const TARGET_CHAT_ID = process.env.TARGET_CHAT_ID as string
    const PHOTO_URL = process.env.PHOTO_URL as string
    const PHOTO_CAPTION = process.env.PHOTO_CAPTION as string
    ctx.telegram.sendPhoto(TARGET_CHAT_ID, fileId, {
        caption,
        reply_markup: { inline_keyboard: [
                [Markup.button.url(PHOTO_CAPTION, PHOTO_URL)],
            ]}
    })
})

// bot.command('/photo', ctx => ctx.scene.enter('customizeMessageScene'))
bot.launch().then(() => console.log('Bot started'))
