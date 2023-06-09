import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface CreateAppointmentRequest {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
    constructor(
        private appointmentsRepository: AppointmentsRepository
    ) {}

    async execute({ customer, startsAt, endsAt }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
        const overlappingAppointment = await this.appointmentsRepository.findConflictingAppointments(
            startsAt,
            endsAt
        )
        
        if (overlappingAppointment) {
            throw new Error('Another appointment overlaps this appointments dates')
        }
        const appointment = new Appointment({
            customer,
            startsAt,
            endsAt
        })
        
        this.appointmentsRepository.create(appointment)

        return appointment;
    }
}