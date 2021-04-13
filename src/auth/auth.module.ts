import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { FileService } from '../file/file.service';
import { FILE_SERVICE } from '../constants';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_KEY,
          signOptions: { expiresIn: process.env.EXPIRESIN },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: FILE_SERVICE,
      useValue: new FileService(),
    },
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
