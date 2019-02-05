const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
// const assert = chai.assert;

const Sequelize = require('sequelize');

describe('Basic models', function(){
  const models = require('..').models;
  const BaseModel = models.BaseModel;

  class Test extends BaseModel{}

  let test = new Test();

  it('should have addField function', function() {
    expect(test.addField).to.be.a('function');
  });

  it('should have setBaseName function', function(){
    expect(test.setBaseName).to.be.a('function');
  });
  
  it('dodb should call db.define with the correct params', function(){

    class SampleModel extends BaseModel{
      constructor(){
        super();

        this.setBaseName('samplemodel');
        this.addField('title', new models.STRING());
      }
    }

    let db = {
      define: function(){}
    };

    chai.spy.on(db, 'define');

    SampleModel.__dodb(db);

    expect(db.define).to.be.called.with('samplemodel', {
      title: {
        type: Sequelize.STRING,
      }
    });

  });

});

describe('Models fields', function(){
  const models = require('..').models;

  it('should have STRING', function(){
    expect(models.STRING).to.be.a('function');
  });

  it('should have TEXT', function() {
    expect(models.TEXT).to.be.a('function');
  });
  
  it('should have DATETIME', function(){
    expect(models.DATETIME).to.be.a('function');
  });

  it('should have INTEGER', function() {
    expect(models.INTEGER).to.be.a('function');
  });

  it('should have BOOLEAN', function() {
    expect(models.BOOLEAN).to.be.a('function');
  });
  
  describe('Relation fields', function(){
    const relation = models.relation;

    it('shoould have foreignkey', function() {
      expect(relation.foreignkey).to.be.a('function');
    });
    
  });

});

describe('Models to ORM', function() {
  const models = require('..').models;
  const BaseModel = models.BaseModel;
  const BaseField = models.BaseField;

  it('should have __todb', function() {
    class Test extends BaseModel{}

    expect(Test.__todb).to.be.a('function');
  });

  it('should have __dbname', function() {
    class Test extends BaseModel{}

    expect(Test.__dbname).to.be.a('function');
  });

  describe('All fields', function(){
    class SampleField extends BaseField{
      constructor(){
        super('type', 'dbtype', {conf: true}, {dbconf: true});
      }
    }

    it('should have to db', function() {
      expect((new SampleField()).todb).to.be.a('function');
    });

    it('should pass on dbconf', function(){
      let db = (new SampleField()).todb();

      expect(db).to.be.an('object')
        .to.deep.include({
          type: 'dbtype',
          dbconf: true
        });
    });
    
  });

  describe('STRING', function() {
    it('should handle base case', function() {
      class Test extends BaseModel{
        constructor(){
          super();
          this.addField('name', new models.STRING());
        }
      }

      let db = Test.__todb();
      expect(db).to.be.an('object')
        .to.deep.include({
          name: {
            type: Sequelize.STRING,
          },
        });
    });

    it('should handle char limits', function(){
      class Test extends BaseModel{
        constructor(){
          super();
          this.addField('name', new models.STRING({size: 64}));
        }
      }

      let db = Test.__todb();
      expect(db).to.be.an('object')
        .to.deep.include({
          name: {
            type: Sequelize.STRING(64)
          }
        });
    });


  });

  describe('TEXT', function() {

    it('should handle bae case', function(){
      class Test extends BaseModel{
        constructor(){
          super();
          this.addField('title', new models.TEXT());
        }
      }

      let db = Test.__todb();
      expect(db).to.be.an('object')
        .to.deep.include({
          title: {
            type: Sequelize.TEXT,
          },
        });
    });
  });
  
  describe('DATETIME', function() {
    it('should handle base case', function() {
      class Test extends BaseModel{
        constructor(){
          super();
          this.addField('date', new models.DATETIME());
        }
      }

      let db = Test.__todb();
      expect(db).to.be.an('object')
        .to.deep.include({
          date: {
            type: Sequelize.DATE,
          },
        });
    });
  });
  
  describe('INTEGER', function() {
    it('should handle base case', function() {
      class Test extends BaseModel{
        constructor(){
          super();
          this.addField('count', new models.INTEGER());
        }
      }

      let db = Test.__todb();
      expect(db).to.be.an('object')
        .to.deep.include({
          count: {
            type: Sequelize.INTEGER,
          },
        });
    });
  });
  
  describe('BOOLEAN', function() {
    it('should handle base case', function() {
      class Test extends BaseModel{
        constructor(){
          super();
          this.addField('condition', new models.BOOLEAN());
        }
      }

      let db = Test.__todb();
      expect(db).to.be.an('object')
        .to.deep.include({
          condition: {
            type: Sequelize.BOOLEAN,
          },
        });
    });
  });

  describe('FOREIGN KEY', function(){
    it('should have test');
  });
  

});

