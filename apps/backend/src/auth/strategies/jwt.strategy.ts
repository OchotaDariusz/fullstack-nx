import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConstants } from '@fullstack/constants';
import { User } from '@fullstack/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  //  eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(payload: any) {
    return {
      id: payload.sub,
      username: payload.username,
      roles: payload.roles,
    } as User;
  }
}
