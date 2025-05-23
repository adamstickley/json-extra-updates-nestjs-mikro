import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ParentRepository } from './parent-repository';
import { TestEntity } from './test.entity';

@Entity({
  schema: 'test',
  tableName: 'parent',
  repository: () => ParentRepository,
})
export class ParentEntity {
  @PrimaryKey()
  id: number;

  @Property({ version: true })
  version!: number;

  @Property({
    length: 500,
  })
  title: string;

  @OneToMany(() => TestEntity, (test) => test.parent, {
    orphanRemoval: true,
    eager: true,
  })
  children = new Collection<TestEntity>(this);
}
