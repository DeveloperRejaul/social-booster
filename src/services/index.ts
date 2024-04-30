import bfAccount from './fb-account/routes';
import gmail from './gmail/routes';
import group from './group/routes';
import user from './user/routes';

export const routers = [
  bfAccount,
  gmail,
  user,
  group
];