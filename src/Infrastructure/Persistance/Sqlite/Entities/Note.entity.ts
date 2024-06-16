import { BaseEntity, Cascade, Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { NoteRepositoryImpl } from '../Repositories/NoteRepositoryImpl.js';
import { t } from '@mikro-orm/core';
import { Category } from './Category.entity.js';

@Entity({ repository: () => NoteRepositoryImpl })
export class Note extends BaseEntity {
   @PrimaryKey()
   id!: number;

   @Property({ type: t.text })
   content!: string;

   @Property()
   status!: string;

   @ManyToMany(() => Category, category => category.notes, { cascade: [Cascade.PERSIST, Cascade.MERGE]})
   categories = new Collection<Category>(this);
   
}