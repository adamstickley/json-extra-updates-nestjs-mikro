import { Injectable } from '@nestjs/common';
import { ParentRepository } from './entity/parent-repository';
import { ParentEntity } from './entity/parent-entity';
import { TestEntity } from './entity/test.entity';

@Injectable()
export class AppService {
  constructor(private parentRepo: ParentRepository) {}

  async run(): Promise<ParentEntity> {
    const newChild = new TestEntity();
    newChild.title = 'child 1';
    newChild.richTextDescription = { json: { example: 1 } };
    const example = new ParentEntity();
    example.title = 'test parent';
    example.children.add(newChild);

    // create
    await this.parentRepo.getEntityManager().persistAndFlush(example);

    // refresh; ensuring any remote changes that might have happened in the DB
    await this.parentRepo.getEntityManager().refresh(example);

    example.title = 'new title';
    // only updating title; should expect only 1 update call: to parent entity
    await this.parentRepo.getEntityManager().persistAndFlush(example);

    return example;
  }
}
