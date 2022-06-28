import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/user.entity';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ isRequired: true })
  content: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', isRequired: true })
  sender: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', isRequired: true })
  reciver: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
