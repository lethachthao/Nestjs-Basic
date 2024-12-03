import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // Báo lỗi nếu có trường không hợp lệ
      transform: true, // Tự động chuyển đổi kiểu dữ liệu
    }),
  );
  app.setGlobalPrefix('api', { exclude: [''] });
  await app.listen(3000);
}
bootstrap();
