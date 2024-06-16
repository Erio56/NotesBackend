import { MikroORM, Options, SqliteDriver, defineConfig } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
  driver: SqliteDriver,
  dbName: 'notesDb.db3',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
};

export const mikroOrmConfig = defineConfig(config);

let orm: MikroORM;

export const initializeMikroORM = async (): Promise<MikroORM> => {
  if (!orm) {
    orm = await MikroORM.init(mikroOrmConfig);
    await orm.schema.updateSchema();
  }
  return orm;
};

export const getEntityManagerInstance = async () => {
  const orm = await initializeMikroORM();
  return orm.em.fork();
};
