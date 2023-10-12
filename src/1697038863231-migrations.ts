import {MigrationInterface, QueryRunner} from 'typeorm';

export class Migrations1697038863231 implements MigrationInterface {
  name = 'Migrations1697038863231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "meta_version" integer NOT NULL, "meta_created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "meta_updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "fieldname" character varying NOT NULL, "originalname" character varying NOT NULL, "encoding" character varying NOT NULL, "mimetype" character varying NOT NULL, "size" integer NOT NULL, "bucket" character varying NOT NULL, "key" character varying NOT NULL, "acl" character varying NOT NULL, "content_type" character varying NOT NULL, "storage_class" character varying NOT NULL, "location" character varying NOT NULL, "etag" character varying NOT NULL, "movie_current_ep" integer NOT NULL, "movie_description" character varying NOT NULL, "movie_logo" character varying NOT NULL, "movie_m3_u8" character varying NOT NULL, "movie_rating" character varying NOT NULL, "movie_title" character varying NOT NULL, "movie_total_ep" integer NOT NULL, "movie_year" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "demo_photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "meta_version" integer NOT NULL, "meta_created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "meta_updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" text NOT NULL, "url" text NOT NULL, "user_id" uuid, CONSTRAINT "CHK_eb9190f1fedfba3b9681c90608" CHECK (LENGTH("name") <= 500), CONSTRAINT "PK_d9dc05e7c3689b80889059223c1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "demo_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "meta_version" integer NOT NULL, "meta_created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "meta_updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "code" text NOT NULL, "name" text NOT NULL, "phone" text, "address" text, "github_link" text, CONSTRAINT "UQ_7d4a1600297264d3461c6ea2bc5" UNIQUE ("code"), CONSTRAINT "CHK_379e89382abc1eb40627420f9c" CHECK (LENGTH("code") <= 100), CONSTRAINT "CHK_5c178b627179c2cac2834c7df9" CHECK (LENGTH("name") <= 500), CONSTRAINT "PK_6dec390d45fcd06af96ef4c5344" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "demo_photo" ADD CONSTRAINT "FK_bf7c157e8a80cc61c15715c9c85" FOREIGN KEY ("user_id") REFERENCES "demo_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "demo_photo" DROP CONSTRAINT "FK_bf7c157e8a80cc61c15715c9c85"`,
    );
    await queryRunner.query(`DROP TABLE "demo_user"`);
    await queryRunner.query(`DROP TABLE "demo_photo"`);
    await queryRunner.query(`DROP TABLE "file"`);
  }
}
