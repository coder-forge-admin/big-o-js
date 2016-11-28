"use strict";

const Promise = require('bluebird');

class BigO{

    constructor(config){
        this.itterate = config.itterate;
        this.reduce = config.reduce;
        this.args;
    }

    makeIterator(array, next){
        var nextIndex = 0;

        return {
           next: next,
        }
    }

    args(args){
        this.args = arguments;
    }

    run(){

        const underTest = require('../bin/underTest'),
            itterations = this.itterations;
        let runs = [];

        for(let x=0; x<itterations; x++){

            this.args = this.argsItterator(this.args);

            const start = new Date(),
                hrStart = process.hrtime();

            console.log('args: ', this.args);
            const res = underTest(this.args);

            const hrEnd = process.hrtime(hrStart),
                dur = {
                    secs: hrEnd[0],
                    ms: hrEnd[1]/1000000
                }

            runs.push({
                args: this.args,
                time: dur,
                result: res,
            });
        }

        return new Promise((resolve, reject)=>{
            return resolve({
                itterations: itterations,
                runs: runs,
            });
        });
    }
}

module.exports = BigO;
