import { SetMetadata } from '@nestjs/common';

import { ROLES_KEY } from '@fullstack/constants';
import { Role } from '@fullstack/types';

export const Roles = (...args: Role[]) => SetMetadata(ROLES_KEY, args);
