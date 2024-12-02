import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passport/jwt.strategy';
import ms from 'ms';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        // Log giá trị của JWT_ACCESS_TOKEN và JWT_ACCESS_EXPIER để kiểm tra
        console.log(
          'JWT_ACCESS_TOKEN:',
          configService.get<string>('JWT_ACCESS_TOKEN'),
        );
        console.log(
          'JWT_ACCESS_EXPIER:',
          configService.get<string>('JWT_ACCESS_EXPIER'),
        );

        return {
          secret: configService.get<string>('JWT_ACCESS_TOKEN'), // Giá trị bí mật JWT
          signOptions: {
            expiresIn: ms(
              configService.get<string>('JWT_ACCESS_EXPIER') || '3600s',
            ), // Thời gian hết hạn JWT
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
