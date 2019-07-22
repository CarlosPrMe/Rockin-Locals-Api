const Router = require("koa-router");
const router = new Router({
    prefix: '/availabilities'
});
const AvailabilityModel = require('../models/availability');
const passport = require('koa-passport');


class AvailabilitiesRouter {


    static async create(ctx) {
        ctx.body = await new AvailabilityModel(ctx.request.body).save();
    };

    static async getAvailabilities(ctx) {
        ctx.body = await AvailabilityModel.find({ 'companyId': `${ctx.query.companyId}`, 'date.month': +`${ctx.query.month}`, 
        'date.day': +`${ctx.query.day}`, 'date.year': +`${ctx.query.year}` }, (err, docs) => {
            if (err) {
                throw new Error("Error", err);
            }
        });
    }

    static async update(ctx) {
        const id = ctx.params.id;
        const availability = await AvailabilityModel.findOneAndUpdate({ _id: id }, ctx.request.body)
        ctx.body = availability;
    }

    static async deleteAvailability(ctx) {
        ctx.body = await AvailabilityModel.deleteOne({ 'companyId': `${ctx.query.companyId}`, 'date.month': +`${ctx.query.month}`, 
        'date.day': +`${ctx.query.day}`, 'date.year': +`${ctx.query.year}` }, (err, docs) => {
            if (err) {
                throw new Error("Error", err);
            }
        });
    }

}
router.get('/', AvailabilitiesRouter.getAvailabilities);

router.use(passport.authenticate('jwt',{
    session:false
}))

router.post('/', AvailabilitiesRouter.create);
router.put('/:id', AvailabilitiesRouter.update);
router.delete('/', AvailabilitiesRouter.deleteAvailability);


module.exports = router;
