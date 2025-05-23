import {
  Entity,
  JsonType,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { TestRepository } from './test.repository';
import { ParentEntity } from './parent-entity';

@Entity({
  schema: 'test',
  tableName: 'test',
  repository: () => TestRepository,
})
export class TestEntity {
  @PrimaryKey()
  id: number;

  @Property({ version: true })
  version!: number;

  @Property({
    length: 500,
  })
  title: string;

  @Property({
    type: JsonType,
  })
  richTextDescription: Record<string, any>;

  @ManyToOne({
    entity: () => ParentEntity,
    eager: false,
    index: true,
  })
  parent: ParentEntity;
}
