"use strict";

const Promise = require('bluebird'),
    bigoAnalyze = require('./bigoAnalyze');

class BigO{

    constructor(config){
        this.iterate = config.iterate || 100;
        this.analyzer = config.analyzer || new bigoAnalyze();
        if(config.arguments) this.args = config.arguments;
        if(config.underTest) this._underTest = config.underTest;
    }

    /**
     * get initial arguments for system under test.
     * @return {Array} Returns current arguments
     */
    get args(){
        return this._arguments;
    }
    /**
     * set initial arguments for system under test.
     * If array passed then argGenerator() will be used.
     * @param {Array | GeneratorArray} args An array of arguments.
     * @return {BigO} Returns self for chaining.
     */
    set args(args){
        (args.next) ?
            this._arguments = args :
            this._arguments = argGenerator(args);
        return this;
    }

    /**
     * Get function under test.
     * Defaults to file in `../bin/underTest`.
     * @return {Function} Returns function to be tested.
     */
    get underTest(){
        if(!this._underTest)
            return require('../bin/underTest');
        return this._underTest;
    }
    /**
     * set function under test.
     * @param  {Function} fn The function to test.
     * @return {BigO}      Returns self for chaining.
     */
    set underTest(fn){
        this._underTest = fn;
        return this;
    }

    /**
     * Run tests. the main() call.
     * @param {Array} ...[0] Arguments to be passed to func.
     * @return Promise Resolves to an array of test res objects.
     */
    run(){

        if(arguments[0]) this.args(arguments[0]);

        const underTest = this.underTest,
            self = this;
        let res,
            runs = [];

        return new Promise((resolve, reject)=>{

            promiseWhile(function(){
                return self.iterate;
            }, function(){
                return new Promise(function(_resolve, _reject){

                    const itArgs = [].concat(self.args.next().value);   // don't copy generator instance
                    self.iterate--;

                    return self.analyzer.start(underTest, itArgs)
                        .then(res => {
                            runs.push({
                                args: itArgs,
                                time: {
                                    secs: res.end[0],
                                    ms: res.end[1]/1000000,
                                },
                                result: res,
                            });
                            _resolve();
                        });
                })
                .catch(reject);
            })
            .then(res => {
                return resolve(runs);
            });

        });
    }
}

/**
 * Generator for incrementing array's.
 * @return {Generator} [description]
 */
 function* argGenerator(){

   let lastVal = 0,
     index = 0,
     args = arguments[0];

   while(true){
     args.push(lastVal++);
     yield args;
   }
 }

/**
 * Iterate promises until condition false.
 * @link http://blog.victorquinn.com/javascript-promise-while-loop
 * @param  {Mixed} condition Condition to test.
 * @param  {Function} action    The promise call to run.
 * @return {Promise}           Bluebird promise.
 */
function promiseWhile(condition, action){
    let resolver = Promise.defer();

    const loop = function(){
        if(!condition()) return resolver.resolve();
        return Promise.cast(action())
            .then(loop)
            .catch(resolver.reject);
    };

    // wait for next cpu tick, if not then won't loop.
    process.nextTick(loop);

    return resolver.promise;
}
module.exports = BigO;
