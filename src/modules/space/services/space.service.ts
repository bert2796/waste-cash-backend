import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { ISpaceObject } from '../interfaces';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class SpaceService {
  private readonly logger = new Logger(SpaceService.name);
  private s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    // initialize S3
    if (!this.s3) {
      this.s3 = new AWS.S3({
        endpoint: new AWS.Endpoint(this.configService.get('SPACE_ENDPOINT') as string),
        credentials: new AWS.Credentials({
          accessKeyId: this.configService.get('SPACE_KEY') as string,
          secretAccessKey: this.configService.get('SPACE_SECRET') as string,
        }),
      });
    }
  }

  async uploadFile(params: { bucket: string; file: Express.Multer.File; name: string }): Promise<ISpaceObject> {
    const { bucket, file, name } = params;
    try {
      return await this.s3
        .upload({
          Bucket: bucket,
          Body: file.buffer,
          ContentType: file.mimetype,
          Key: name,
          ACL: 'public-read',
        })
        .promise();
    } catch (error) {
      this.logger.error(`DO Space failed to upload file = ${error.message}, bucket: ${bucket}, name: ${name}`);
      this.logger.error(error.stack);

      throw new BadRequestException('Failed to upload file');
    }
  }
}
