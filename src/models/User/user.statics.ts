import { IUserModel } from './user.types';

export function findByEmail(this: IUserModel, email: string) {
  return this.findOne({ email });
}
