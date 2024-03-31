import {Schema, model} from 'mongoose';

interface IGmail {
  name: string
  password: string
  email: string
  rule: 'user' | 'admin' | 'moderator' | 'super-admin'
}

const gmailSchema = new Schema<IGmail>({
  email:{type: String, required: true},
  password:{type: String, required: true},
  name:{type: String, required: true},
  rule: {type: String, required: true, enum :['user' , 'admin' , 'moderator' , 'super-admin']}
},{timestamps:true});

export const Gmail = model('user', gmailSchema);