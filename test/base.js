const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
// const assert = chai.assert;

describe('Inn Class', function() {
  const Inn = require('..');

  it('should have a register function', function() {
    let inn = new Inn();

    expect(inn.register).to.be.a('function');
  });

  it('should have a start function', function() {
    let inn = new Inn();

    expect(inn.start).to.be.a('function');
  });

  it('should have a setup function', function() {
    let inn = new Inn();

    expect(inn.setup).to.be.a('function');
  });

  it('should call dodb on models after setup', function() {
    let inn = new Inn({useActivity: false});
    class Test extends Inn.models.BaseModel{
      static __dodb(){
      }
    }
    chai.spy.on(Test, '__dodb');

    inn.register(Test);
    inn.setup();

    expect(Test.__dodb).to.have.been.called.with(inn.db);

  });
  
  it('should call setup in start', function() {
    let inn = new Inn({useActivity: false});
    chai.spy.on(inn, 'setup');

    inn.start();

    expect(inn.setup).to.have.been.called();
  });
  
   
});

