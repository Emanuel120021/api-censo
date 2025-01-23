import { Injectable, NotFoundException } from '@nestjs/common';
import { Membros } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CensoService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Omit<Membros, 'id'>,
  ): Promise<{ id: number; numero: string; message: string }> {
    // Cria o novo ônibus
    const membro = await this.prisma.membros.create({ data });

    // Retorna apenas os campos necessários
    return {
      id: membro.id,
      numero: membro.nome,
      message: 'Cadastro feito com sucesso!',
    };
  }

  async findAll(): Promise<Membros[]> {
    return this.prisma.membros.findMany();
  }

  async findById(id: number): Promise<Membros> {
    return await this.prisma.membros.findUniqueOrThrow({ where: { id } });
  }

  async update(
    id: number,
    data: Partial<Membros>,
  ): Promise<{ id: number; nome: string; message: string }> {
    const membros = await this.prisma.membros.update({ where: { id }, data });

    try {
      return {
        id: membros.id,
        nome: membros.nome,
        message: 'Cadastro atualizado com sucesso!',
      };
    } catch (error) {
      throw new NotFoundException('Erro ao atualizar cadastro!');
    }
  }

  async delete(
    id: number,
  ): Promise<{ id: number; nome: string; message: string }> {
    const membros = await this.prisma.membros.delete({ where: { id } });
    try {
      return {
        id: membros.id,
        nome: membros.nome,
        message: 'Cadastro deletado com sucesso!',
      };
    } catch (error) {
      throw new NotFoundException('Erro ao deletar esse cadastro!');
    }
  }
}
