import { UserRoles } from '../../../common/constant';

export interface IUser {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  role: UserRoles;
  address: string;
  city: string;
  zip: string;
}
