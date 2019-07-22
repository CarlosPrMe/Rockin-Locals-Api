const Router = require("koa-router");
const router = new Router({
    prefix: '/users'
});
const UserModel = require('../models/user');
const passport = require('koa-passport');

class UserRouter {

    static async create(ctx) {
        try {
            ctx.body = await new UserModel(ctx.request.body).save();
        } catch (error) {
            ctx.body = error;
        }
    };


    static async getUsers(ctx) {
        ctx.body = await (ctx.query ? UserModel.find(ctx.query) : null);
    }


    static async getUsersById(ctx) {
        const user = await UserModel.findById(ctx.params.id);
        if (!user) {
            ctx.throw(404, 'User not found');
            return;
        }
        ctx.body = user;
    }

    static async modify(ctx) {
        let user = await UserModel.findById(ctx.params.id)
        if (!user) {
            ctx.throw(404, 'User not found');
            return;
        }
        user = Object.assign(user, ctx.request.body);
        let res = await {};
        res.data = await user.save();
        ctx.body = await res;
    }

    static async delete(ctx) {
        const id = ctx.params.id;
        const user = await UserModel.deleteOne({ _id: id });
        if (!user) {
            ctx.throw(404, 'User not found');
            return;
        }
        ctx.body = user;
    }

}

router.post('/', UserRouter.create);
router.get('/', UserRouter.getUsers);
router.get('/:id', UserRouter.getUsersById);

router.use(passport.authenticate('jwt', {
    session: false
}))

router.put('/:id', UserRouter.modify);
router.delete('/:id', UserRouter.delete)


module.exports = router;