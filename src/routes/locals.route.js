const Router = require("koa-router");
const router = new Router({ prefix: '/locals' });
const LocalModel = require('../models/local');
const passport = require('koa-passport');


class LocalsRouter {

    static async create(ctx) {
        ctx.body = await new LocalModel(ctx.request.body).save();

    };


    static async getLocals(ctx) {
        if (ctx.query.city) {
            ctx.body = await (ctx.query ? LocalModel.find({ city: new RegExp(`${ctx.query.city}`, 'gi') }) : null);
        } else if (ctx.query.postalCode) {
            ctx.body = await (ctx.query ? LocalModel.find({ postalCode: new RegExp(`${ctx.query.postalCode}`, 'gi') }) : null);
        } else if (ctx.query.companyId) {
            ctx.body = await (LocalModel.find({ companyId: `${ctx.query.companyId}` }))
        }
        else {
            ctx.body = await (ctx.query ? LocalModel.find(ctx.query) : null);
        }
    }


    static async getLocalsById(ctx) {
        const local = await LocalModel.findById(ctx.params.id);
        if (!local) {
            ctx.throw(404, 'Local not found');
            return;
        }
        ctx.body = local
    }

    static async update(ctx) {
        const id = ctx.params.id;
        const local = await LocalModel.findOneAndUpdate({ _id: id }, ctx.request.body)
        if (!local) {
            ctx.throw(404, 'Local not found')
        }
        ctx.body = local;
    }

    static async delete(ctx) {
        const id = ctx.params.id;
        const local = await LocalModel.deleteOne({ _id: id });
        if (!local) {
            ctx.throw(404, 'Local not found');
        }
        ctx.body = local;
    }
    static async deleteByLocal(ctx) {
        const local = await LocalModel.deleteOne({'companyId': `${ctx.query.companyId}`}, (err, docs) => {
            if (err) {
                throw new Error("Error", err);
            }
        });
        ctx.body = local;
    }
}


router.get('/', LocalsRouter.getLocals);
router.get('/:id', LocalsRouter.getLocalsById)

router.use(passport.authenticate('jwt', { 
    session: false
}))

router.post('/', LocalsRouter.create)
router.put('/:id', LocalsRouter.update);
router.delete('/:id', LocalsRouter.delete);
router.delete('/', LocalsRouter.deleteByLocal);


module.exports = router;

