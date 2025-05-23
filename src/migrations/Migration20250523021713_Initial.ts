import { Migration } from '@mikro-orm/migrations';

export class Migration20250523021713_Initial extends Migration {

  override async up(): Promise<void> {
    this.addSql('create schema if not exists "test";');
    this.addSql('create table "test"."parent" ("id" serial primary key, "title" varchar(500) not null);');

    this.addSql('create table "test"."test" ("id" serial primary key, "title" varchar(500) not null, "rich_text_description" jsonb not null, "parent_id" int not null);');
    this.addSql('create index "test_parent_id_index" on "test"."test" ("parent_id");');

    this.addSql('alter table "test"."test" add constraint "test_parent_id_foreign" foreign key ("parent_id") references "test"."parent" ("id") on update cascade;');
  }

}
