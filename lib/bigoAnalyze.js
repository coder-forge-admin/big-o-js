"use strict";

const Promise = require('bluebird');

/**
 * Function analyzer class.
 * @author daithi coombes <webeire@gmail.com>
 * @license MIT
 */
class BigOAnalyze{

    constructor(){
        this.debug = false;
    }

    /**
     * Start analyzing
     * @param {Function} fn The function to analyze.
     * @return {Promise} Resolves to object: {start: time[], end: time[]}
     */
    start(fn, args){
        return new Promise((resolve, reject)=>{

            const start = this.timerOn();
            let str = "fn(";
                if(arguments[1]) str += arguments[1].toString();
                str += ")";

            if(this.debug) console.log('\t\t => '+str);

            eval(str);

            const end = this.timerOff(start);

            return resolve({
                args: arguments[1],
                start: start,
                end: end
            });

        });
    }

    /**
     * Start process timer.
     * @return {time}
     */
    timerOn(){
        return process.hrtime();
    }

    /**
     * Stop process timer.
     * @param {time} time A process.hrtime() result.
     * @return {time}
     */
    timerOff(time){
        return process.hrtime(time);
    }
}

module.exports = BigOAnalyze;
