import { S3 } from 'aws-sdk';

export interface ISpaceObject extends S3.Object {
  Location: string;
}
