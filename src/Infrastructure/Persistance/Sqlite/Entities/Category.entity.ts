import { BaseEntity, Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Note } from './Note.entity.js';
import { CategoryRepositorImpl } from '../Repositories/CategoryRepositoryImpl.js';

@Entity({ repository: () => CategoryRepositorImpl})
export class Category extends BaseEntity {
   @PrimaryKey()
   id!: number;

   @Property()
   name!: string;
   
   @ManyToMany(() => Note, note => note.categories, { owner: true })
   notes = new Collection<Note>(this);   
}