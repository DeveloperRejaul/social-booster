import server from './server/server';

export default async function main (){
  await server();
 
  // handle account
  // await accountService.signup({
  //   firstName:'kamal',
  //   lastName:'Mia',
  //   birthDay:'06-06-1999',
  //   email:'kamalmia1030@gmail.com',
  //   gender:'male',
  //   password:'kamal1030'
  // });

  // await fbAccount.login({email:'kamalmia1060@gmail.com', password:'kamal1060' });
  // await Test();
  
  // await gmailAccount.create({
  //   firstName:'jamal_kamal_hira',
  //   lastName:'khan',
  //   day:5,
  //   month:7,
  //   year:1999,
  //   gender:1,
  //   gmail:'kamal1200859367',
  //   password:'rejaul120qweq0'
  // });

}

(async()=>{ await main (); })();