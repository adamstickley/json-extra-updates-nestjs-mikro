import { EntityRepository } from '@mikro-orm/postgresql';
import { ParentEntity } from './parent-entity';

export class ParentRepository extends EntityRepository<ParentEntity> {}
