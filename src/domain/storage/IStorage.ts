import { FileDTO } from 'src/domain/dtos/File.dto';

export abstract class IStorage {
  abstract upload(file: FileDTO): Promise<any>;
}
