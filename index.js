const models = require('./models');

class Inn {

  constructor(){
    this.models = [];
  }

  register(model){
    this.models.push(model);
  }

  start(){
    this.setup();
  }

  setup(){
    for (let model of this.models){
      model.dodb(this.db);
    }
  }

}

Inn.models = models;

module.exports = Inn;
