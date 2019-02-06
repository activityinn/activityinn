const models = require('.');
const BaseModel = models.BaseModel;

class Actor extends BaseModel {
  constructor(){
    super();
    this.setBaseName('actor');
    this.addField('id', new models.STRING());
    this.addField('name', new models.STRING());
    // TODO a way to handle other fields
  }
}

module.exports = {
  Actor,
};
