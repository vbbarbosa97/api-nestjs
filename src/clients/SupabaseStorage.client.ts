import { FileDTO } from 'src/domain/dtos/File.dto';
import { IStorage } from 'src/domain/storage/IStorage';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupabaseStorage implements IStorage {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL ?? '';
    const supabaseKey = process.env.SUPABASE_KEY ?? '';
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  public async upload(file: FileDTO, folder: string): Promise<any> {
    return await this.client.storage.from(process.env.SUPABASE_BUCKET ?? '').upload(`${folder}/${file.originalname}`, file.buffer, {
      upsert: true,
    });
  }
}
