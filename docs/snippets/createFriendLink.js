/**
 * Requiers - FindByProps
 * data/findByProps.js
 */

const createInviteModule = findByProps('createFriendInvite');
if (createInviteModule) {
    copy(
        `https://discord.gg/${
            (await createInviteModule.createFriendInvite()).code
        }`
    );
}
console.log('%cWorked!', 'font-size: 50px');
console.log(
    `%cYou now have your invite link in the clipboard!`,
    'font-size: 16px'
);
