import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(email: string, username: string) {
    const user = await this.userModel.create({ email, username });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async invite(
    email: string,
    currentUserEmail: string,
  ): Promise<{
    status: 'OK' | 'Error';
    message: string;
  }> {
    const invitedUser = await this.findByEmail(email);
    const currentUser = await this.findByEmail(currentUserEmail);
    if (invitedUser.invites.includes(currentUser._id)) {
      return {
        status: 'Error',
        message: 'you have already sent an invite',
      };
    }
    invitedUser.invites.push(currentUser);
    await invitedUser.save();
    return {
      status: 'OK',
      message: 'sent invitation successfully',
    };
  }

  async addFriend(
    email: string,
    didAccept: boolean,
    currentUserEmail: string,
  ): Promise<{
    status: 'OK' | 'Error';
    message: string;
  }> {
    const currentUser = await this.findByEmail(currentUserEmail);
    const newFriend = await this.findByEmail(email);
    if (currentUser.friends.includes(newFriend._id)) {
      return {
        status: 'Error',
        message: 'you are already friends',
      };
    }

    if (!currentUser.invites.includes(newFriend._id)) {
      return {
        status: 'Error',
        message: 'you dont have such an invite',
      };
    }
    currentUser.invites = currentUser.invites.filter(
      (user) => user.email === email,
    );
    if (didAccept) {
      currentUser.friends.push(newFriend);
      newFriend.friends.push(currentUser);
      await newFriend.save();
    }
    await currentUser.save();
    return {
      status: 'OK',
      message: 'added friend successfully',
    };
  }
}
