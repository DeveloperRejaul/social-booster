import { AccountService } from './bot/fbAccount';
import { Gmail} from './bot/gmail';
const accountService = new AccountService();
const gmail = new Gmail();

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

  // await accountService.login({email:'kamalmia1060@gmail.com', password:'kamal1060' });

  await gmail.createAccount();

}