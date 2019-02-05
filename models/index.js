const Sequelize = require('sequelize');

const BaseModel = require('./BaseModel');

class BaseField{
  constructor(type, dbtype, conf, dbconf){
    this.type = type;
    this.conf = conf || {};
    this.dbtype = dbtype;
    this.dbconf = dbconf || {};
  }

  todb(){
    return {
      type: this.dbtype,
      ...this.dbconf
    };
  }
}

const STRING_SYMBOL = Symbol('STRING');
class STRING extends BaseField{
  constructor(conf={}){
    // TODO set dbconf based on cof?
    let dbtype = Sequelize.STRING;
    if(conf.size)
      dbtype = Sequelize.STRING(conf.size);
    super(STRING_SYMBOL, dbtype, conf);
  }
}

const TEXT_SYMBOL = Symbol('TEXT');
class TEXT extends BaseField{
  constructor(conf){
    // TODO set dbconf based on conf?
    super(TEXT_SYMBOL, Sequelize.TEXT, conf);
  }
}

const INTEGER_SYMBOL = Symbol('NUMBER');
class INTEGER extends BaseField{
  constructor(conf){
    // TODO set dbconf based on cof?
    super(INTEGER_SYMBOL, Sequelize.INTEGER, conf);
  }
}

const BOOLEAN_SYMBOL = Symbol('BOOLEAN');
class BOOLEAN extends BaseField{
  constructor(conf){
    // TODO set dbconf based on cof?
    super(BOOLEAN_SYMBOL, Sequelize.BOOLEAN, conf);
  }
}

const DATETIME_SYMBOL = Symbol('DATETIME');
class DATETIME extends BaseField{
  constructor(conf){
    // TODO set dbconf based on cof?
    super(DATETIME_SYMBOL, Sequelize.DATE, conf);
  }
}

class BaseRelation{
  constructor(model){
    this.model = model;
  }
}

const FOREIGNKEY_SYMBOL = Symbol('FOREIGNKEY');
class foreignkey extends BaseRelation{
  setup(m){
    m.belongsTo(this.model.__dodb());
  }
}

module.exports = {
  BaseModel,
  BaseField,
  BaseRelation,
  STRING,
  STRING_SYMBOL,
  TEXT,
  TEXT_SYMBOL,
  INTEGER,
  INTEGER_SYMBOL,
  BOOLEAN,
  BOOLEAN_SYMBOL,
  DATETIME,
  DATETIME_SYMBOL,
  relation: {
    foreignkey,
  },
  FOREIGNKEY_SYMBOL,
};
