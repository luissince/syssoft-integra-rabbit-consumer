import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PdfWorkerService } from './pdf-worker.service';
import { CreatePdfWorkerDto } from './dto/create-pdf-worker.dto';

@Controller()
export class PdfWorkerController {
  constructor(private readonly pdfWorkerService: PdfWorkerService) {}

  @MessagePattern(process.env.RABBITMQ_QUEUE)
  async create(@Payload() createPdfWorkerDto: CreatePdfWorkerDto) {
    return await this.pdfWorkerService.create(createPdfWorkerDto);
  }

}
