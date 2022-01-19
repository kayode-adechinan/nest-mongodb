import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Technical documentation')
    .setVersion('1.0')
    //.addTag('prod')
    .build();

  // in order to replace this line : http://localhost:3000/docs/#/default/ItemController_create
  // with -> http://localhost:3000/docs/#/default/create
  // the lines bellow are set
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      // supportedSubmitMethods: [''], disable post, put and delete action
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
