import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
    const SCARLET_HTTP_PORT: number = 3001;
    const SCARLET_TCP_PORT: number = 3002;
    const app: INestApplication = await NestFactory.create(AppModule);
    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            port: SCARLET_TCP_PORT,
            retryAttempts: 5,
            retryDelay: 3000,
        },
    });
    await app.startAllMicroservicesAsync();
    await app.listen(SCARLET_HTTP_PORT, () =>
        console.log(`Scarlet Witch is started on ${SCARLET_HTTP_PORT}/${SCARLET_TCP_PORT}`)
    );
}
bootstrap();
