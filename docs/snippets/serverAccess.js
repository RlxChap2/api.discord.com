const find =
    (typeof findByProps !== 'undefined' && findByProps) || window?.findByProps || window?.Vencord?.Webpack?.findByProps;
if (!find)
    throw void console.log(
        '%cYou must run this script first: https://discord.com/channels/603970300668805120/1085682686607249478',
        'color:red;font-size:2rem'
    );

const PermissionStore = find('canBasicChannel');
const UserStore = find('getUserStoreVersion');
const GuildStore = 'getGuildCount';

const setProtoFields = (obj, fields, value) => fields.forEach((field) => (Object.getPrototypeOf(obj)[field] = value));
const permissionProps = Object.fromEntries(
    Object.keys(PermissionStore.getGuildPermissionProps({ id: 0 })).map((key) => [key, true])
);

setProtoFields(PermissionStore, ['getGuildPermissions'], () => ~0n);
setProtoFields(PermissionStore, ['getGuildPermissionsProps'], (guild) => ({ ...permissionProps, guild }));

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
GuildStore.addChangeListener(() =>
    GuildStore.getGuildsArray().forEach((g) => (g.ownerId = UserStore.getCurrentUser().id))
);
GuildStore.emitChange();
