import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalPipes(
    new ValidationPipe(),
    //   {
    //   whitelist: true, // Loại bỏ các trường không được định nghĩa trong DTO
    //   forbidNonWhitelisted: true, // Báo lỗi nếu có trường không được phép
    // }
  );
  app.setGlobalPrefix('api', { exclude: [''] });
  await app.listen(3000);
}
bootstrap();
