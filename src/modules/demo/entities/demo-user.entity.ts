import {Check, Column, Entity, OneToMany} from 'typeorm';
import {BaseEntity} from '../../../entities/base.entity';
import {DemoPhoto} from './demo-photo.entity';

@Entity({
  orderBy: {
    metaUpdatedDate: 'DESC',
  },
})
export class DemoUser extends BaseEntity {
  @Column({type: 'text', unique: true, update: false})
  @Check(`LENGTH("code") <= 100`)
  code: string;

  @Column({type: 'text'})
  @Check(`LENGTH("name") <= 500`)
  name: string;

  @Column({type: 'text', nullable: true})
  phone: string;

  @Column({type: 'text', nullable: true})
  address: string;

  @Column({type: 'text', nullable: true})
  githubLink: string;

  @OneToMany(() => DemoPhoto, (photo) => photo.user, {
    eager: true,
  })
  photos: DemoPhoto[];
}
