/**
 * Requiers - FindByProps
 * data/findByProps.js
 */

const createGroupInviteModule = findByProps('createInvite');
if (createGroupInviteModule) {
    const channelID = '1341384735175348295'; // Replace with your channel - Group ID
    const invite = await createGroupInviteModule.createInvite(channelID);
    if (invite) {
        let url = `https://discord.gg/${invite.code}`;
        console.log(url);
    }
}
console.log('%cWorked!', 'font-size: 50px');
console.log(
    `%cYou now have your group invite link in the clipboard!`,
    'font-size: 16px'
);
