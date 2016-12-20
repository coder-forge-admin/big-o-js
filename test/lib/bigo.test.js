"use strict";

const assert = require('chai').assert,
    config = {
        iterate: 10,
        reduce: (arg, i)=>{return arg;},
    };
let BigOClass = require('../../lib/bigo'),
    bigo;

describe('bigo', ()=>{

    beforeEach(()=>{

        bigo = new BigOClass(config);
    });

    it('will set config', ()=>{

        assert.equal(bigo.iterate, config.iterate);
        assert.equal(bigo.reduce.toString(), config.reduce.toString());
    });

    it('will analyze a function', ()=>{

      BigOAnalyze.start(fnStr)
        .then(res => {
          res.start.ms;
          res.end.ms;
          res.duration.ms;
        });
    });

    it('will run system under test', ()=>{

      return bigo.run(BigOTimer)
        .then(results => {

        });
    });

    it('will handle factory generator array (1 dim)', ()=>{

      testAr = BigOGenerator([1,2,3,4]);
      bigo.args = testAr;
    });

    it('will run x amount of iterations', ()=>{

        let test = [2,3,1,5];

        bigo.iterations = 10;

        return bigo.run(test)
            .then(actual => {
                assert.equal(actual.runs.length, 10);
            })
    });
});
