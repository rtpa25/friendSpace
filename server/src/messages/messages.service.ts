import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, MessageDocument } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.messageModel.create(createMessageDto);
    return message;
  }

  async findAll(sender: User, reciver: User) {
    //this is just the method to fetch all the messages from the db for a soecific conversation
    const messages = this.messageModel.find({
      sender: sender,
      reciver: reciver,
    });
    return messages;
  }
}
