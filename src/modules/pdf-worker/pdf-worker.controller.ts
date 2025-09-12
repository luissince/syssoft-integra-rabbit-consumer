import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PdfWorkerService } from './pdf-worker.service';
import { CreatePdfWorkerDto } from './dto/create-pdf-worker.dto';
import { CATALOG_PDF_QUEUE } from 'src/constants/queues';

@Controller()
export class PdfWorkerController {
  constructor(private readonly pdfWorkerService: PdfWorkerService) {}

  @MessagePattern(CATALOG_PDF_QUEUE)
  async create(@Payload() createPdfWorkerDto: CreatePdfWorkerDto) {
    return await this.pdfWorkerService.create(createPdfWorkerDto);
  }

}
