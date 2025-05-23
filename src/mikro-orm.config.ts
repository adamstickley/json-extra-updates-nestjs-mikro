import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlOptions } from '@mikro-orm/postgresql/PostgreSqlMikroORM';

export const MIKRO_ORM_CONFIG: PostgreSqlOptions = {
  // folder-based discovery setup, using common filename suffix
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],

  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    fileName: (timestamp: string, name?: string) => {
      // force user to provide the name, otherwise you would end up with `Migration20230421212713_undefined`
      if (!name) {
        throw new Error(
          'Specify migration name via `mikro-orm migration:create --name=...`',
        );
      }
      return `Migration${timestamp}_${name}`;
    },
  },
  host: 'localhost',
  port: 5439,
  dbName: 'main',
  user: 'root',
  password: 'password',
  forceUndefined: true,
  loadStrategy: 'select-in',
};

export default defineConfig(MIKRO_ORM_CONFIG);
