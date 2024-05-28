import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Doctor } from "./Doctor";

@Entity('cita')
export class Cita extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: "day_date" })
    day_date!: Date;

    @Column({ name: "doctor_id" })
    doctorID!: number;

    @Column({ name: "cliente_id" })
    clienteID!: number;

    @Column({ name: "description" })
    description!: string;

    @Column({ name: "price" })
    price!: number;

    // @Column({ name: "is_active" })
    // isActive!: boolean;

    // Relación: Cita {0..n}--{1} Tatuador
    @ManyToOne(() => Doctor, (doctor) => doctor.cita)
    @JoinColumn({ name: "doctor_id" })
    doctor!: Doctor;

    // Relación: Cita {0..n}--{1} Cliente
    @ManyToOne(() => Cliente, (cliente) => cliente.id)
    @JoinColumn({ name: "cliente_id" })
    cliente!: Cliente;
}