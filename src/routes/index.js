const userRouter = require('./users.route');
const reservationRouter = require('./reservations.route');
const localRouter = require('./locals.route');
const availabilityRouter = require('./availability.route');
const authRouter = require('./auth.route');
const multerRouter = require('./multer.route');
const Router = require('koa-router');
const router = new Router({prefix:'/rockinLocals'})


router.use(reservationRouter.routes());
router.use(userRouter.routes());
router.use(localRouter.routes());
router.use(availabilityRouter.routes());
router.use(authRouter.routes());
router.use(multerRouter.routes())



module.exports = router;
