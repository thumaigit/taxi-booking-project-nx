import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../../../../libs/auth-guard/constants';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserJwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3000s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserJwtStrategy],
  exports: [AppService],
})
export class AppModule {}
