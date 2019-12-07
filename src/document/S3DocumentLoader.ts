import { Logger, LoggerFactory } from '@codification/cutwater-logging';
import { S3 } from 'aws-sdk';
import { GetObjectRequest } from 'aws-sdk/clients/s3';
import { AppConfig } from '../AppConfig';
import { DocumentLoader } from './DocumentLoader';

const LOG: Logger = LoggerFactory.getLogger();

export class S3DocumentLoader implements DocumentLoader {
  private readonly s3 = new S3();

  public loadDocument(name: string): Promise<string> {
    const req: GetObjectRequest = {
      Bucket: AppConfig.templateBucketName,
      Key: name,
    };
    return new Promise((resolve, reject) => {
      this.s3.getObject(req, (err, data) => {
        if (err && err.statusCode !== 404) {
          LOG.error(`Error loading document from S3[${req.Bucket}/${name}]:`, err);
          reject(new Error(`Error loading document from S3: ${req.Bucket}/${name}`));
        } else {
          if (data && data.Body) {
            resolve(data.Body.toString());
          } else {
            reject(new Error(`Document not found: ${req.Bucket}/${name}`));
          }
        }
      });
    });
  }
}
