"use strict";

const assert = require('chai').assert,
    expect = require('chai').expect,
    Promise = require('bluebird'),
    config = {
        iterate: 10,
    };
let BigOClass = require('../../lib/bigo'),
    bigo;

describe('bigo', ()=>{

    beforeEach(()=>{

        bigo = new BigOClass(config);
    });

    it('will set config', (done)=>{

        const actual = {
            iterate: 100000023,
            analyzer: function Analyzer(){},
            arguments: [1,2,3],
            underTest: function UnderTest(){},
        },
            test = new BigOClass(actual);

        assert.equal(test.iterate, actual.iterate);
        assert.equal(test.analyzer.toString(), actual.analyzer.toString());
        expect(test.args).to.be.an.instanceof(Object);
        assert.equal(test.underTest.toString(), actual.underTest.toString());
        done();
    });

    it('will factory a generator object from arguments', (done)=>{

        const test  = [1,2,3,4];

        bigo.args = test;
        expect(bigo.args.next).to.be.instanceof(Function);
        assert.deepEqual(bigo.args.next().value, [1,2,3,4,0]);
        done();
    });

    it('will iterate fn through Analyzer', ()=>{

        let testFnStr;

        const mockAnalyzer = {
            start(fn){
                testFnStr = fn.toString();
                return Promise.resolve({ start: [ 3844, 260128029 ], end: [ 0, 212560 ] });
            }
        };

        bigo.underTest = function(args){
            console.log('underTest args: ', args);
        }

        bigo.analyzer = mockAnalyzer;
        bigo.iterate = 1;
        bigo.args = [1,2,3,4,56];
        return bigo.run()
            .then(res => {

                assert.equal(res.length, 1);
                assert.equal(bigo.underTest.toString(), testFnStr);

                const actual = res[0];
                expect(actual).to.have.deep.property('args');
                expect(actual).to.have.deep.property('time.secs');
                expect(actual).to.have.deep.property('time.ms');
                expect(actual).to.have.deep.property('result.end');
                assert.equal(actual.result.end.toString(), [ 0, 212560 ].toString());
                expect(actual).to.have.deep.property('result.start');
                assert.equal(actual.result.start.toString(), [ 3844, 260128029 ].toString());
                return res;
            });
    });

    it('will run x amount of iterations', ()=>{

        let test = [2,3,1,5];

        bigo.args = test;

        return bigo.run()
            .then(actual => {
                assert.equal(actual.length, 10);
            });
    });
});
