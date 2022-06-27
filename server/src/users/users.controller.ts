import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateInviteDto } from './dtos/create-invite.dto';
import { UsersService } from './users.service';
import { AddFriendDto } from './dtos/add-friend.dto';
import { CurrentUserEmail } from './decorators/current-user-email.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Controller('users')
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUserEmail() currentUserEmail: string) {
    return this.usersService.findByEmail(currentUserEmail);
  }

  @Patch('/invite')
  @UseGuards(AuthGuard)
  async invite(
    @Body() body: CreateInviteDto,
    @CurrentUserEmail() currentUserEmail: string,
  ) {
    if (body.invitedUserEmail === currentUserEmail) {
      throw new BadRequestException(
        'send an invite to someone other than your self',
      );
    }
    const res = await this.usersService.invite(
      body.invitedUserEmail,
      currentUserEmail,
    );
    if (res.status === 'Error') {
      throw new BadRequestException(res.message);
    }
  }

  @Patch('/friend')
  @UseGuards(AuthGuard)
  async addFriend(
    @Body() body: AddFriendDto,
    @CurrentUserEmail() currentUserEmail: string,
  ) {
    if (body.email === currentUserEmail) {
      throw new BadRequestException('you can not be your own friend');
    }
    const res = await this.usersService.addFriend(
      body.email,
      body.didAccept,
      currentUserEmail,
    );
    if (res.status === 'Error') {
      throw new BadRequestException(res.message);
    }
  }

  @Get('/friends')
  @UseGuards(AuthGuard)
  async getAllFriends(@CurrentUserEmail() currentUserEmail: string) {
    return this.usersService.findAllFriends(currentUserEmail);
  }

  @Get('/invites')
  @UseGuards(AuthGuard)
  async getAllInvites(@CurrentUserEmail() currentUserEmail: string) {
    return this.usersService.findAllInvites(currentUserEmail);
  }
}
