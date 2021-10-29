import fs from 'fs';

import { ConfigService } from '../src/modules/config/config.service';

const configService = new ConfigService('.env');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { logger, ...restConfig } = configService.getTypeOrmConfig();

fs.writeFileSync('ormconfig.json', JSON.stringify(restConfig));
