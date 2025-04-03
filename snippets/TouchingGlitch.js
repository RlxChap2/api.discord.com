/**
 * The Last Meadow - Touching Glitch
 * @version 2.0
 * @description: Clicks all target buttons 20 times every 1 second
 */

/**
 * @description: Auto click version 1
 */
async function autoClick() {
    let interval = 1;
    let threads = 20;
    let clicks = 0;

    let button = document.querySelector('p');

    if (button) {
        for (let i = 0; i < threads; i++) {
            button.click();
            clicks++;
        }
        console.log(`${clicks}`);
        await sleep(interval * 1000);
        autoClick();
    } else {
        console.log('❌');
    }
}

/**
 * @description: Auto click version 2
 */
function grassCollector() {
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

grassCollector();

/**
 * @description: Remove Mute
 */
function removeMute() {
    let muteButton = document.querySelector('.image__6c989');

    if (muteButton) {
        muteButton.click();
        console.log(`✅ Mute toggled`);
    } else {
        console.log('❌ Mute button not found');
    }
}

removeMute();

/**
 * @description: Remove Flower
 */
function removeFlowerFunc() {
    let muteButton = document.querySelector('.weed_fa03d7');

    if (muteButton) {
        muteButton.click();
        console.log(`✅ Flower Removed`);
    } else {
        console.log('❌ Flower not found');
    }
}

removeFlowerFunc();

/**
 * @description: Claim Leveling
 */
function claimLevelingButton() {
    let muteButton = document.querySelector('.claimButton__8e695');

    if (muteButton) {
        muteButton.click();
        console.log(`✅ Claimed Leveling Button`);
    } else {
        console.log('❌ Claim button not found');
    }
}

claimLevelingButton();

/**
 * @description: Upgrade
 */
function upgradeButton() {
    let muteButton = document.querySelector('.upgrade__75ed5');

    if (muteButton) {
        muteButton.click();
        console.log(`✅ Upgraded Item`);
    } else {
        console.log('❌ Upgrade button not found');
    }
}

upgradeButton();

/**
 * @description: Cart Slayer
 */
function cartSlayer() {
    let muteButton = document.querySelector('.lawnmower__78658');

    if (muteButton) {
        muteButton.click();
        console.log(`✅ Cart Slayed`);
    } else {
        console.log('❌ Cart not found');
    }
}

cartSlayer();

/**
 * @description: Items
 */
function itemsUpgrade() {
    let muteButton = document.querySelector('.item__4b373');

    if (muteButton) {
        muteButton.click();
        console.log(`✅ Items Upgraded`);
    } else {
        console.log('❌ Items not found');
    }
}

itemsUpgrade();

/**
 * @version 2.1
 * @description: New System of auto click
 */

let interval = 1;
let threads = 20;
let clicks = 0;

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function autoClick() {
    let selectors = [
        'p',
        '.image__6c989', // UnMute button
        '.weed_fa03d7', // Flower removal
        '.claimButton__8e695', // Claim leveling
        '.upgrade__75ed5', // Upgrade button
        '.lawnmower__78658', // Cart slayer
        // '.item__4b373', // Items upgrade (it will crash your app)
    ];

    selectors.forEach((selector) => {
        let elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            for (let i = 0; i < threads; i++) {
                element.click();
                clicks++;
            }
        });
    });

    setTimeout(() => {
        console.log(`✅ Clicked ${clicks} times`);
    }, 20 * 1000); // 20 seconds delay to check if it still working

    await sleep(interval);
    autoClick();
}

autoClick();
