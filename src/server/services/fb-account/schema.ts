import { DateString } from '@type/account';
import {Schema, model} from 'mongoose';


interface IFBAccount {
  firstName: string
  lastName: string
  email: string
  password: string
  avatar: string
  gender: 'male' | 'female' | 'custom'
  birthday: DateString
}

const FBAccountSchema = new Schema<IFBAccount>({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email:{type: String, required: true},
  password:{type: String, required: true},
  gender :{type :String , enum:['male', 'female', 'custom'], required: true},
  birthday :{type :String , required: true},
  avatar:{type: String, required: false},
},{timestamps:true});
  
export const FBAccounts = model('fb-accounts',FBAccountSchema);