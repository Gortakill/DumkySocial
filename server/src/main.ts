import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // app.useGlobalPipes(new ValidationPipe)
    app.enableCors();
    await app.listen(PORT, () =>
        console.log(`Server started on port: ${PORT}`),
    );
}
bootstrap();
