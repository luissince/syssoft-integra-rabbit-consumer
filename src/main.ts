import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log(process.env.RABBITMQ_HOSTS);
  console.log(process.env.RABBITMQ_QUEUE);
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_HOSTS],
      queue: process.env.RABBITMQ_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.listen();
}
bootstrap();