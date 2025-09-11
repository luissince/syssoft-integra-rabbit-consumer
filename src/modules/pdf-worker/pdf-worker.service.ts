import { Injectable } from '@nestjs/common';
import { CreatePdfWorkerDto } from './dto/create-pdf-worker.dto';
import { SizePrint } from 'src/common/enums/size.enum';
import { currentDate, formatDecimal } from 'src/helper/utils.helper';
import { generatePDF } from 'src/helper/pdf.helper';
import { uploadPdfToS3 } from 'src/helper/s3.helper';
import { getIcon, getStyle } from 'src/config/assets.config';
import axios from 'axios';

@Injectable()
export class PdfWorkerService {

  async create(createPdfWorkerDto: CreatePdfWorkerDto) {
    // 1. Configuración del PDF
    const width = SizePrint.A4;
    const template = 'catalog/a4.ejs';

    // 2. Datos para el PDF
    const data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'CATALOGO PRODUCTOS',
      year: currentDate().split('-')[0],
      ...createPdfWorkerDto,
    };

    // 3. Generar buffer del PDF
    const buffer: Buffer = await generatePDF(
      template,
      width,
      {
        ...data,
        formatDecimal,
      },
      false,
    );

    // 4. Subir a S3
    const fileKey = `catalogs/${createPdfWorkerDto.company.documento}_catalog_${Date.now()}.pdf`;
    const key = await uploadPdfToS3(buffer, fileKey);

    await axios.post(createPdfWorkerDto.webhook, {
      key,
      status: 'LISTO',
      idCatalogo: createPdfWorkerDto.catalog.idCatalogo,
    });

    console.log('PDF generado y subido a S3');
    return 'This action adds a new pdfWorker';
  }

}
