module.exports = class BaseModel{
  constructor(){
    this.__fields = {};
    this.__relations = [];
  }

  addField(name, type){
    // TODO
    this.__fields[name] = type;
  }

  addRelation(rel){
    this.__relations.push(rel);
  }

  setBaseName(name){
    this.__basename = name;
  }

  static __todb(){
    let sample = new this();

    let fields = sample.__fields;

    let ans = {};

    for (let item in fields){
      let conf = fields[item];
      ans[item] = conf.todb();
    }

    return ans;
  }

  static __dbname(){
    let sample = new this();

    return sample.__basename;
  }

  static __dodb(db){
    if(typeof this.__dbmodel !== 'undefined')
      return this.__dbmodel;
    this.__dbmodel = db.define(this.__dbname(), this.__todb());

    let sample = new this();

    for(let rel of sample.__relations){
      rel.setup(this.__dbmodel);
    }

    return this.__dbmodel;
  }
};
