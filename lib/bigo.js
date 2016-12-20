"use strict";

const Promise = require('bluebird');

class BigO{

    constructor(config){
        this.iterate = config.iterate || 100;
        this.reduce = config.reduce;
        this.args;
    }

    /**
     * Arguments setter.
     * @param Array args An array of arguments.
     * @return BigO Returns self for chaining.
     */
    args(args){
        this.args = arguments;
        return this;
    }

    /**
     * Run tests. the main() call.
     * @return Promise Resolves to an array of test res objects.
     */
    run(){

        const underTest = require('../bin/underTest');
        let hrStart, hrEnd,
          runs = [],
          args = argGenerator(this.args[0]);

        for(let x=0; x<this.iterate; x++){

            const start = new Date(),
                itArgs = [].concat(args.next().value);
            let res;
            hrStart = process.hrtime();

            try{
              res = eval("underTest("+itArgs.toString()+")");
            }catch(e){
              console.error('\nCode under test threw error!\n\n');
              throw e;
            }

            hrEnd = process.hrtime(hrStart);

            runs.push({
                args: itArgs,
                time: {
                    secs: hrEnd[0],
                    ms: hrEnd[1]/1000000,
                },
                result: res,
            });
        }

        return new Promise((resolve, reject)=>{
            return resolve(runs);
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

module.exports = BigO;
