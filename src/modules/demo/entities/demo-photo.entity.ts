import {Check, Column, Entity, ManyToOne} from 'typeorm';
import {BaseEntity} from '../../../entities/base.entity';
import {DemoUser} from './demo-user.entity';

@Entity({
  orderBy: {
    metaUpdatedDate: 'DESC',
  },
})
export class DemoPhoto extends BaseEntity {
  @Column({type: 'text'})
  @Check(`LENGTH("name") <= 500`)
  name: string;

  @Column({type: 'text', nullable: false})
  url: string;

  @ManyToOne(() => DemoUser, (user) => user.photos, {
    // eager: true,
  })
  user: DemoUser;
}
