const Router = require("koa-router");
const router = new Router({
    prefix: '/reservations'
});
const ReservationModel = require('../models/reservation');
const passport = require('koa-passport');

class ReservationRouter {

    static async create(ctx) {
        ctx.body = await new ReservationModel(ctx.request.body.reserva).save();
    };


    static async getReservations(ctx) {
        
        if (ctx.query && ctx.query.companyName && !ctx.query.day) {
            ctx.body = await ReservationModel.find({ 'companyName': `${ctx.query.companyName}` }, (err, doc) => { });

        } else if (ctx.query && ctx.query.bandName) {
            ctx.body = await ReservationModel.find({ 'bandName': `${ctx.query.bandName}` }, (err, doc) => { });
        } else if (ctx.query && ctx.query.bandId) {
            ctx.body = await ReservationModel.find({ 'bandId': `${ctx.query.bandId}` }, (err, doc) => { });
        } else if (ctx.query && ctx.query.companyId) {
            ctx.body = await ReservationModel.find({ 'companyId': `${ctx.query.companyId}` }, (err, doc) => { });
        } else if (ctx.query && ctx.query.companyName && ctx.query.day && ctx.query.month) {
            ctx.body = await ReservationModel.find({ 'companyName': `${ctx.query.companyName}`, 'date.month': +`${ctx.query.month}`, 'date.day': +`${ctx.query.day}` }, (err, docs) => {
                if (err) {
                    throw new Error("Error", err);
                }
            });
        }
    };


    static async delete(ctx) {
        const id = ctx.params.id;
        const reservation = await ReservationModel.deleteOne({ _id: id });
        if (!reservation) {
            ctx.throw(404, 'Reservation not found');
            return;
        }
        ctx.body = reservation;
    }

}


router.use(passport.authenticate('jwt',{
    session:false
}))

router.post('/', ReservationRouter.create);
router.get('/', ReservationRouter.getReservations);
router.delete('/:id', ReservationRouter.delete);


module.exports = router;