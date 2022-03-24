import { EntityRepository, Repository } from 'typeorm';

import { BidderSetup } from '../entities/bidderSetup.entity';

@EntityRepository(BidderSetup)
export class BidderSetupRepository extends Repository<BidderSetup> {}
