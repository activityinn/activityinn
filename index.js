const models = require('./models');

class Inn {

  constructor(config = {}){
    if(typeof config.useActivity === 'undefined')
      config.useActivity = true;

    this.config = config;
    this.models = [];
  }

  register(model){
    this.models.push(model);
  }

  start(){
    this.setup();
  }

  setup(){
    if(this.config.useActivity){
      const {Actor} = require('./models/activity.js');
      this.register(Actor);
    }

    for (let model of this.models){
      model.__dodb(this.db);
    }
  }

}

Inn.models = models;

module.exports = Inn;
