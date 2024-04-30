import { DateString } from '@type/bot';
import { Schema, model, ObjectId } from 'mongoose';

interface IGmail {
  lastName: string
  firstName: string
  password: string
  email: string
  birthday: DateString
  gender: number
  facebook: ObjectId
}

const gmailSchema = new Schema<IGmail>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthday: { type: String, required: true },
  gender: { type: Number },
  facebook: { type: Schema.Types.ObjectId, ref: 'fb-accounts' }
}, { timestamps: true });

export const Gmail = model('gmail', gmailSchema);