import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        mergeObjectProperties: true,
        entities: ['dist/**/*.entity.js'],
        entitiesTs: ['src/**/*.entity.ts'],
        driver: PostgreSqlDriver,
        host: 'localhost',
        port: 5439,
        dbName: 'main',
        user: 'root',
        password: 'password',
        debug: true,
        metadataProvider: TsMorphMetadataProvider,
        connect: true,
        forceUndefined: true,
        loadStrategy: 'select-in',
      }),
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
