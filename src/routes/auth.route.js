const Router = require("koa-router");
const router = new Router({
    prefix: '/auth'
});
const passport = require('koa-passport');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class AuthRouter {

    static async createUser(ctx) {
        let exits = await UserModel.find({email:ctx.request.body.email}) ;
        if(!exits._id){
            const salt = await bcrypt.genSalt();
            const password = await bcrypt.hash(ctx.request.body.password, salt);
            const pass = {
                provider: 'local',
                salt,
                password,
            }
            const user = Object.assign(ctx.request.body, pass);
            await new UserModel(user).save();
            const res = await ctx.response;
            ctx.body =  res;

        }else{
            ctx.throw(404, 'Email ya existente');
        }

    }


    static async logout(ctx) {
        ctx.logout();
        ctx.body = (ctx.state.status = 200);

    }

    static async generateToken(ctx) {
        const token = jwt.sign({data:{
            _id: ctx.state.user._id}}, 'superSecret', {
            expiresIn: '24h',
            issuer: 'node',
            audience: 'api'
        })
        ctx.body = { token };
    }

    static fail(ctx) {
        ctx.throw(401, 'no autenticado')
    }

    static async getMe(ctx){ 

        const id = ctx.state.user._id
        const user = await UserModel.findOne({ _id: id })

        if(!user.location){
            user.location = {};
        }
        if(!user.description){
            user.description = '';
        }

        let data = {
            _id: user._id,
            userName: user.userName,
            type : user.type,
            bandName : user.bandName,
            companyName : user.companyName,
            email: user.email,
            avatar : user.avatar,
            city: user.city,
            address:user.address,
            postalCode: user.postalCode,
            favourites: user.favourites,
            location:user.location,
            provider: user.provider,
            description : user.description
        }
        ctx.state.user = data;
        ctx.body = ctx.state.user
    }

}



router.post('/sign-up', AuthRouter.createUser);
router.post('/login', passport.authenticate('local'), AuthRouter.generateToken);
router.get('/logout', AuthRouter.logout);

router.get('/me', passport.authenticate('jwt', {
    session:false,
}), AuthRouter.getMe)

router.get('/fail', AuthRouter.fail)


module.exports = router;
