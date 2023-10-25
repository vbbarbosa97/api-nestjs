export type CreateUserDTO = {
  username: string;
  password: string;
  name: string;
  email: string;
};

export type UserCreatedDTO = {
  id: string;
  createdAt: Date;
} & CreateUserDTO;

export type UsernameAndEmailDTO = {
  email: string;
  username: string;
};
