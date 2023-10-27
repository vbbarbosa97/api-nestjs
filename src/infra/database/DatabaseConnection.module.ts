import { Global, Module } from '@nestjs/common';
import { DatabaseConnectionService } from './DatabaseConnection.service';

@Global() //Permite utilizar em todas as camadas
@Module({
  providers: [DatabaseConnectionService],
  exports: [DatabaseConnectionService],
})
export class DatabaseConnectionModule {}
