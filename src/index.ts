import { Account } from './bot/fb/account';

const fbAccount = new Account();

export default async function main (){
 
  // handle account
  // await accountService.signup({
  //   firstName:'kamal',
  //   lastName:'Mia',
  //   birthDay:'06-06-1999',
  //   email:'kamalmia1030@gmail.com',
  //   gender:'male',
  //   password:'kamal1030'
  // });

  await fbAccount.login({email:'kamalmia1060@gmail.com', password:'kamal1060' });

}

(async()=>{ await main (); })();