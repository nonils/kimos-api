import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Kimos API V1')
    .setDescription('Kimos API documentation')
    .setVersion('1.0')
    .addTag('Kimos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/swagger', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
