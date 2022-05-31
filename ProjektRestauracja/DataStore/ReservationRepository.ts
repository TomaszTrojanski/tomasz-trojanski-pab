import {Schema, model, connect} from 'mongoose';
import Reservation from '../Core/ReservationModel';

export class RestaurantRepository
{
    reservationSchema = new Schema<Reservation>(
        {
            reservationId: {type: Number, required: true},
            tableNumber: {type: Number, required: false},
            startDateTime: {type: Date, required: true},
            endDateTime: {type: Date, required: true},
            customerId: {type: Number, required: true}
        });
    ReservationModel = model<Reservation>('Reservation', this.reservationSchema);

    async populateReservations() : Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        const reservations =[
            {
                reservationId: 1,
                tableNumber: 1,
                startDateTime: new Date(2020, 1, 1, 10, 0, 0),
                endDateTime: new Date(2020, 1, 1, 11, 0, 0),
                customerId: 1
        },{
                reservationId: 2,
                tableNumber: 2,
                startDateTime: new Date(2020, 1, 1, 10, 0, 0),
                endDateTime: new Date(2020, 1, 1, 11, 0, 0),
                customerId: 2
        }];

        await this.ReservationModel
        .insertMany(reservations)
        .then(function(){
            console.log('Reservations have been populated')
        }
        ).catch(function(err){
            console.log(err);
        });
    }

    async addReservation(reservation: Reservation):Promise<void>{
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        await this.ReservationModel
        .create(reservation)
        .then(function(){
            console.log('Reservation"+reservation.reservationId+"has been added')}
        ).catch(function(err){
            console.log(err);
        });
    }
    async deleteReservationByNumber(reservationId: number):Promise<void>{
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        await this.ReservationModel
        .deleteOne({reservationId: reservationId})
        .then(function(){
            console.log('Reservation"+reservationId+"has been deleted')}
        ).catch(function(err){
            console.log(err);
        });
    }
    async getReservationById(reservationId: number):Promise<Reservation>{
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        let reservation = await this.ReservationModel.findOne({reservationId: reservationId});
        if(reservation)
        {
            return reservation;
        }else{
            return null as any;
        }
    }
    async getReservations():Promise<Reservation[]>{
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        return await this.ReservationModel.find({});

    }
    async updateReservation(reservation: Reservation):Promise<void>{
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        await this.ReservationModel
        .updateOne({reservationId: reservation.reservationId}, reservation)
        .then(function(){
            console.log('Reservation"+reservation.reservationId+"has been updated')}
        ).catch(function(err){
            console.log(err);
        });
    }
}