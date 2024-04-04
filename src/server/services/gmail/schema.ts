import { DateString } from '@type/account';
import {Schema, model} from 'mongoose';

interface IGmail {
  lastName: string
  firstName: string
  password: string
  email: string
  birthday: DateString
  gender: number
}


const gmailSchema = new Schema<IGmail>({
  firstName:{type: String, required: true},
  lastName:{type: String, required: true},
  email:{type: String, required: true},
  password:{type: String, required: true},
  birthday:{type: String, required: true},
  gender: {type: Number}
},{timestamps:true});

export const Gmail = model('gmail', gmailSchema);