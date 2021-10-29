import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { UserRoles } from '../constant';

export const Authorize = (roles?: UserRoles[]): CustomDecorator<string> => SetMetadata('authorize', { roles });
