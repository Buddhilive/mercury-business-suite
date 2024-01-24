import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ngnest_docs' })
export class DocEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column({ nullable: true })
    date: Date;

    @Column({ nullable: true })
    doctype: string;

    @Column({ nullable: true })
    status: string;

    @Column({ nullable: true })
    author: string;
}
