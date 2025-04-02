/**
 * The Last Meadow - Touching Glitch
 * @version 1.0
 * @description: Clicks the button 20 times every 1 second
 */

let interval = 1;
let threads = 20;
let clicks = 0;

function autoClick() {
    let button = document.querySelector('p');
    if (button) {
        for (let i = 0; i < threads; i++) {
            button.click();
            clicks++;
        }
        console.log(`${clicks}`);
        setTimeout(autoClick, interval);
    } else {
        console.log('❌');
    }
}

autoClick();
