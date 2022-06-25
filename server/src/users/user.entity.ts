import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }])
  friends: User[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }])
  invites: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
