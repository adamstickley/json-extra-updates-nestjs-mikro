import { Migration } from '@mikro-orm/migrations';

export class Migration20250523022803_Version extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "test"."parent" add column "version" int not null default 1;');

    this.addSql('alter table "test"."test" add column "version" int not null default 1;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "test"."parent" drop column "version";');

    this.addSql('alter table "test"."test" drop column "version";');
  }

}
