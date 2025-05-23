import { Test } from '@nestjs/testing';
import config from '../src/mikro-orm.config';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ParentEntity } from '../src/entity/parent-entity';
import { TestEntity } from '../src/entity/test.entity';
import { AppService } from '../src/app.service';
import { MikroORM } from '@mikro-orm/core';

describe('app', () => {
  it('should only call one update', async () => {
    const module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          allowGlobalContext: true,
          driver: PostgreSqlDriver,
          connect: true,
          debug: !!process.env.DEBUG,
        }),
        MikroOrmModule.forFeature([ParentEntity, TestEntity]),
      ],
      providers: [AppService],
    }).compile();

    const appService = module.get<AppService>(AppService);
    const orm = await module.resolve(MikroORM);

    const result = await appService.run();

    const parent = await orm.em.findOneOrFail(ParentEntity, { id: result.id });
    const testChild = await orm.em.findOneOrFail(TestEntity, {
      id: result.children[0].id,
    });

    // make test not complain about hanging
    await orm.close(true);
    await module.close();

    // inserted, then updated
    expect(parent.version).toBe(2);

    // inserted, but not updated
    expect(testChild.version).toBe(1);
  });

  it('should only call one update (no forceUndefined)', async () => {
    const module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          forceUndefined: false,
          allowGlobalContext: true,
          driver: PostgreSqlDriver,
          connect: true,
          debug: !!process.env.DEBUG,
        }),
        MikroOrmModule.forFeature([ParentEntity, TestEntity]),
      ],
      providers: [AppService],
    }).compile();

    const appService = module.get<AppService>(AppService);
    const orm = await module.resolve(MikroORM);

    const result = await appService.run();

    const parent = await orm.em.findOneOrFail(ParentEntity, { id: result.id });
    const testChild = await orm.em.findOneOrFail(TestEntity, {
      id: result.children[0].id,
    });

    // make test not complain about hanging
    await orm.close(true);
    await module.close();

    // inserted, then updated
    expect(parent.version).toBe(2);

    // inserted, but not updated
    expect(testChild.version).toBe(1);
  });
});
