export interface User {
  _id: string;
  email: string;
  username: string;
  friends: User[];
  invites: User[];
}
