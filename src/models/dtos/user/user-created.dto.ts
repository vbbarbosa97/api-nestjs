import { CreateUserDTO } from './create-user.dto';

export type UserCreatedDTO = {
  id: string;
  createdAt: Date;
} & CreateUserDTO;
