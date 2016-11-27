"use strict";

const Promise = require('bluebird');

class BigO{

    constructor(){
        this.itterations = 1;
        this.args;
        this.argsItterator;
    }

    argsItterator(fn){
        this.argsItterator = fn;

        return this;
    }

    run(){

        const underTest = require('../bin/underTest'),
            itterations = this.itterations;
        let runs = [];

        for(let x=0; x<itterations; x++){

            this.args = this.argsItterator[0](this.args);

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
