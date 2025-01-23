import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CensoService } from './censo/censo.service';
import { CensoController } from './censo/censo.controller';
import { CensoModule } from './censo/censo.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CensoModule, PrismaModule],
  controllers: [AppController, CensoController],
  providers: [AppService, CensoService, PrismaService],
})
export class AppModule {}
