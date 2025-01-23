import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Membros } from '@prisma/client';
import { CensoService } from './censo.service';

@Controller('censo')
export class CensoController {
  constructor(private readonly censoService: CensoService) {}

  @Post()
  create(@Body() data: Omit<Membros, 'id'>) {
    return this.censoService.create(data);
  }

  @Get()
  findAll() {
    return this.censoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.censoService.findById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Membros>) {
    return this.censoService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.censoService.delete(+id);
  }
}
