import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const orm = await app.resolve(MikroORM);
  const migrator = orm.getMigrator();
  await migrator.up();

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3003);
}

bootstrap();
