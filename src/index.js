require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const body = require('koa-body');
const cors = require('koa-cors');
const router = require('./routes');
const mongoose = require('mongoose');

const session = require('koa-session');

const passport = require('koa-passport');

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_URI}`;

const onDBReady = err => {

  if (err) {
    throw new Error("Error connecting", err);
  }

  app.keys = ['secretitaClavecita'];

  app.use(body());
  app.use(cors());

  app.use(session({}, app))

  app.use(passport.initialize());
  app.use(passport.session());
  require('./passport');
  
  
  app.use(router.routes());


  app.on("error", (err, ctx) => {
    console.log(err);
  });


  app.listen(3000, () => {
    console.log("Servidor a la escucha en puerto 3000!");
  });
};

mongoose.connect(mongoUri,{ useNewUrlParser: true } ,onDBReady);