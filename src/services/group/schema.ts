/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Document, Schema, model, Model } from 'mongoose';

interface IGroup extends Document {
    id: number;
    accounts: Array<mongoose.Types.ObjectId>;
}

interface IGroupModel extends Model<IGroup> {
    add(id: string): Promise<any>;
}

const GroupSchema = new Schema<IGroup>({
    id: { type: Number, required: true, unique: true },
    accounts: [{ type: Schema.Types.ObjectId, ref: 'fb-accounts' }]
});


GroupSchema.statics.add = async function (id: string) {
    const group = await Group.find();
    if (group.length <= 0) {
        const newGroup = new Group({ id: 1, accounts: [id] });
        await newGroup.save();
    } else {
        const latestGroup = await Group.findOne({}).sort({ id: -1 }).limit(1);
        if (latestGroup?.accounts && latestGroup?.accounts.length >= 100) {
            const newGroup = new Group({ id: latestGroup.id + 1, accounts: [id] });
            await newGroup.save();
        } else {
            await latestGroup?.updateOne({ $addToSet: { accounts: { $each: [id] } } }, { new: true, useFindAndModify: false });
        }
    }
};


export const Group = model<IGroup, IGroupModel>('group', GroupSchema);