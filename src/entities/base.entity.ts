import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @VersionColumn({update: false})
  metaVersion: number;
  @CreateDateColumn({type: 'timestamptz', insert: false, update: false})
  metaCreatedDate: Date;
  @UpdateDateColumn({type: 'timestamptz', insert: false, update: false})
  metaUpdatedDate: Date;
}
