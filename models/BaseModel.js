module.exports = class BaseModel{
  constructor(){
    this.__relations = {};
  }

  addField(name, type){
    // TODO
    this.__relations[name] = type;
  }

  setBaseName(name){
    this.__basename = name;
  }

  static __todb(){
    let sample = new this();

    let relations = sample.__relations;

    let db = {};

    for (let item in relations){
      let conf = relations[item];
      db[item] = conf.todb();
    }

    return db;
  }

  static __dbname(){
    let sample = new this();

    return sample.__basename;
  }

  static __dodb(db){
    db.define(this.__dbname(), this.__todb());
  }
};
