import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateUserSchema = z.object({
  email: z.string({ required_error: 'Email é obrigatório' }).email('Email inválido.'),
  name: z.string({ required_error: 'Nome é obrigatório' }),
  password: z.string({ required_error: 'Senha é obrigatório' }),
  username: z.string({ required_error: 'UserName é obrigatório' }),
});

export class CreateUserDTO extends createZodDto(CreateUserSchema) {}

export const CreateUserResponseDTO = CreateUserSchema.omit({ password: true });
