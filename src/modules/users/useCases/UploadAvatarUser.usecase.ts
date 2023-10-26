import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { extname } from 'path';
import { FileDTO } from 'src/domain/dtos/File.dto';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';
import { IStorage } from 'src/domain/storage/IStorage';

@Injectable()
export class UploadAvatarUserUseCase {
  constructor(
    private storage: IStorage,
    private userRepository: IUserRepository,
  ) {}

  public async execute(file: FileDTO, userId: string) {
    try {
      const extFile = extname(file.originalname);
      const transformName = `${userId}${extFile}`;

      file.originalname = transformName;

      await this.storage.upload(file, 'avatar');

      const avatarUrl = `avatar/${transformName}`;

      await this.userRepository.updateAvatarUrl(userId, avatarUrl);

      return 'Avatar adicionado com sucesso!';
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
