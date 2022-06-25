import { IsEmail } from 'class-validator';

export class CreateInviteDto {
  @IsEmail()
  invitedUserEmail: string;
}
