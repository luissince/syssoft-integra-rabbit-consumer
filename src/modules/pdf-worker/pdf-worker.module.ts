import { Module } from '@nestjs/common';
import { PdfWorkerService } from './pdf-worker.service';
import { PdfWorkerController } from './pdf-worker.controller';

@Module({
  controllers: [PdfWorkerController],
  providers: [PdfWorkerService],
})
export class PdfWorkerModule {}
