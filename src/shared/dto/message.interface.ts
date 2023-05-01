import { Document, ObjectId } from 'mongoose';

export interface IMessage extends Document {
  readonly _id?: ObjectId;
  number: Number;
  content: string;
  createdAt: Date;
}
