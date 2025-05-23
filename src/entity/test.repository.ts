import { TestEntity } from './test.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

export class TestRepository extends EntityRepository<TestEntity> {}
