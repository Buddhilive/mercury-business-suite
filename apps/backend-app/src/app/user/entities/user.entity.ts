import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude, classToPlain, } from 'class-transformer';
@Entity({ name: 'ngnest_user' })
export class UserEntity {
    @Exclude({ toPlainOnly: true })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ nullable: true })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Exclude({ toPlainOnly: true })
    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true, select: false })
    password: string;

    @Column({ type: 'text', nullable: true })
    bio: string;

    @BeforeInsert()
    emailToLowercase() {
        this.email = this.email.toLowerCase();
    }

    toJSON() {
        return classToPlain(this);
    }
}
