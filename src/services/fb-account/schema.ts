import { DateString } from '@type/bot';
import { Schema, model } from 'mongoose';
import { Gmail } from '../gmail/schema';
import { Group } from '../group/schema';

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
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'custom'], required: true, default: 'male' },
  birthday: { type: String, required: true },
  avatar: { type: String, required: false },
}, { timestamps: true });

FBAccountSchema.post('save', async (fb) => {
  // await Gmail.findOneAndUpdate({ email: fb.email }, { $set: { facebook: fb._id } });
  await Group.add(fb._id.toString());
});

export const FBAccounts = model('fb-accounts', FBAccountSchema);