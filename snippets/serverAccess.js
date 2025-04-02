/**
 * Requiers - FindByProps
 * data/findByProps.js
 */

let permStore = findByProps('canBasicChannel');
[
    'can',
    'canAccessGuildSettings',
    'canAccessMemberSafetyPage',
    'canBasicChannel',
    'canImpersonateRole',
    'canManageUser',
    'canWithPartialContext',
    'isRoleHigher',
].forEach((a) => (permStore.__proto__[a] = () => true));

/**
 * @version 2
 * @description: Server Access
 */
const find =
    (typeof findByProps !== 'undefined' && findByProps) ||
    window?.findByProps ||
    window?.Vencord?.Webpack?.findByProps;
if (!find)
    throw void console.log(
        '%cYou must run this script first: https://discord.com/channels/603970300668805120/1085682686607249478',
        'color:red;font-size:2rem'
    );

const PermissionStore = find('canBasicChannel');
const UserStore = find('getUserStoreVersion');
const Guild = Object.values(find('getGuildCount').getGuilds())[0];

const setProtoFields = (obj, fields, value) =>
    fields.forEach((field) => (Object.getPrototypeOf(obj)[field] = value));

setProtoFields(
    PermissionStore,
    [
        'can',
        'canAccessGuildSettings',
        'canAccessMemberSafetyPage',
        'canBasicChannel',
        'canImpersonateRole',
        'canManageUser',
        'canWithPartialContext',
        'isRoleHigher',
    ],
    () => true
);

setProtoFields(
    Guild,
    ['isOwner', 'isOwnerWithRequiredMfaLevel'],
    function (id) {
        return [UserStore.getCurrentUser()?.id, this.ownerId].includes(id);
    }
);
