/**
 * Requiers - FindByProps
 * data/findByProps.js
 */

let sendBotMessageModule = findByProps('sendBotMessage');

if (sendBotMessageModule && sendBotMessageModule.sendBotMessage) {
    sendBotMessageModule.sendBotMessage(
        window.location.pathname.slice(10).split('/')[1],
        'Heyy'
    );
}
