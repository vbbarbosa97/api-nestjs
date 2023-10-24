import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  public transform(value: CreateUserDTO) {
    if (!value.name || !value.email || !value.password || !value.username) {
      throw new HttpException(
        '[name, password, email, username] is required!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return value;
  }
}
