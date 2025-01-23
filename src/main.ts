import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Verifica o ambiente de produção ou desenvolvimento
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    // Configuração CORS para produção
    app.enableCors({
      origin: 'https://censo-ja1.vercel.app', // Substitua pelo seu domínio de produção
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  } else {
    // Configuração CORS para desenvolvimento (localhost)
    app.enableCors({
      origin: 'http://localhost:4200', // Frontend no localhost
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  }

  await app.listen(3000); // Ou a porta que você está utilizando
}
bootstrap();
