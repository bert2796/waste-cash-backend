import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import fs from 'fs';
import joi from 'joi';

import { TypeOrmLoggerContainer } from '../../common/type-orm/logger';

interface Config {
  [key: string]: string | number | boolean;
}

@Injectable()
export class ConfigService {
  private readonly config: Config;

  constructor(filePath: string) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const file: Buffer = fs.readFileSync(filePath);

    const config = dotenv.parse(file);
    this.config = this.validateInput(config);
  }

  private validateInput(config: Config): Config {
    const configSchema: joi.ObjectSchema = joi.object({
      HOST: joi.string().required(),
      JWT_ACCESS_TOKEN_EXP: joi.string().required(),
      JWT_ACCESS_TOKEN_SECRET: joi.string().required(),
      JWT_REFRESH_TOKEN_EXP: joi.string().required(),
      JWT_REFRESH_TOKEN_SECRET: joi.string().required(),
      MYSQL_DATABASE: joi.string().required(),
      MYSQL_HOST: joi.string().required(),
      MYSQL_PASSWORD: joi.string().required(),
      MYSQL_PORT: joi.string().required(),
      MYSQL_USERNAME: joi.string().required(),
      PORT: joi.number().required(),
      TYPEORM_LOGGING: joi.boolean().required(),
      SPACE_ENDPOINT: joi.string().required(),
      SPACE_KEY: joi.string().required(),
      SPACE_SECRET: joi.string().required(),
    });

    const { error, value } = configSchema.validate(config);
    if (error) {
      throw new Error(`Config Service Error: ${error.message}`);
    }

    return value;
  }

  get(key: string): string | number | boolean {
    return this.config[`${key}`];
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.get('MYSQL_HOST') as string,
      port: this.get('MYSQL_PORT') as number,
      database: this.get('MYSQL_DATABASE') as string,
      username: this.get('MYSQL_USERNAME') as string,
      password: this.get('MYSQL_PASSWORD') as string,

      entities: ['**/*.entity{.ts,.js}'],
      migrations: ['src/database/migrations/*.ts'],
      migrationsTableName: 'migration',

      logger: TypeOrmLoggerContainer.ForConnection('mysql', this.get('TYPEORM_LOGGING') as boolean),
      cli: {
        migrationsDir: 'src/database/migrations',
      },
    };
  }
}
