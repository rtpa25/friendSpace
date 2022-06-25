import { IsBoolean, IsEmail } from 'class-validator';

export class AddFriendDto {
  @IsEmail()
  email: string;

  @IsBoolean()
  didAccept: boolean;
}
