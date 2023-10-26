import { FileDTO } from 'src/domain/dtos/File.dto';

export abstract class IStorage {
  abstract upload(file: FileDTO, folder: string): Promise<any>;
}
