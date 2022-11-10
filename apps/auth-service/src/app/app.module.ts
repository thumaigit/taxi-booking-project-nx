import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { AppService } from './app.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_CONSTANTS_SECRET,
      signOptions: { expiresIn: '3000s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy],
  exports: [AppService],
})
export class AppModule {}
