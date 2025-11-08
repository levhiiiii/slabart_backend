import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Enable CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN')?.split(',') || '*',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix(configService.get('API_PREFIX') || 'api');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Slabart Finance API')
    .setDescription('Financial management application API')
    .setVersion('1.0')
    .addTag('Authentication', 'User authentication endpoints')
    .addTag('Salary', 'Salary management endpoints')
    .addTag('Expenses', 'Expense tracking endpoints')
    .addTag('Loans', 'Loan and EMI management endpoints')
    .addTag('Borrow', 'Borrow/Lend tracking endpoints')
    .addTag('Dashboard', 'Dashboard analytics endpoints')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  console.log(`🚀 Server running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
