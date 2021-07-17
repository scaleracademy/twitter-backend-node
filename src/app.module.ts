import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdDbModule } from './commons/db.module';
import { ApiModule } from './api.module';

@Module({
  imports: [ApiModule, ProdDbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
