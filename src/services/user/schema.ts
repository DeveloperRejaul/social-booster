import {Schema, model} from 'mongoose';

interface IUser {
  name: string
  password: string
  email: string
  rule: 'user' | 'admin' | 'moderator' | 'super-admin'
}

const UserSchema = new Schema<IUser>({
  email:{type: String, required: true},
  password:{type: String, required: true},
  name:{type: String, required: true},
  rule: {type: String, required: true, enum :['user' , 'admin' , 'moderator' , 'super-admin']}
},{timestamps:true});

export const User = model('user', UserSchema);