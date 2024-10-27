import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomValidationPipe } from './pipe/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function startApp() {
  try {
    const PORT = process.env.PORT || 3030;
    console.log(PORT);

    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    // app.useGlobalPipes(new CustomValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('Stadium Finder')
      .setDescription('Stadium Finder Project REST API')
      .setVersion('1.0')
      .addTag(
        'NestJs, Validation, swagger, guard, sequalize, pg, miler, bot ,sms, cookie ...',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
startApp();
