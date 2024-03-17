import { AccountService } from './bot/account';
const accountService = new AccountService();

export default async function main (){
 
  // handle account
  accountService.create();

}