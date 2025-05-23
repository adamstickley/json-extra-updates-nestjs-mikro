import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './orm/orm.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TestEntity } from './entity/test.entity';
import { ParentEntity } from './entity/parent-entity';

@Module({
  imports: [MikroOrmModule.forFeature([ParentEntity, TestEntity]), OrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
