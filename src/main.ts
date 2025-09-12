import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { CATALOG_PDF_QUEUE } from './constants/queues';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_HOSTS],
      queue: CATALOG_PDF_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.listen();
}
bootstrap();