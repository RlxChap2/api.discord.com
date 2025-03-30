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
