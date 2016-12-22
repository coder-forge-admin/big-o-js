"use strict";

const config = {
    iterate: 4,
    arguments: [[34],[6298]],
};

const fs = require('fs'),
    bigoClass = require('./lib/bigo'),
    bigo = new bigoClass(config);

bigo
    .run()
    .then(runs => {

        // model data for d3.js in front end.
        const d3Runs = runs.map((a, i)=>{
            return {
                size: (()=>{
                    let size = 0;
                    for(let x=0; x<a.args.length; x++){
                        size += a.args[x].length;
                    }
                    return size;
                })(),
                time: a.time.ms,
            };
        });

        fs.writeFile('data.json', JSON.stringify(d3Runs), e=>{
            if(e) throw Error('Error writing to file: \n\t'+e.message);
            console.log('Analysis complete, refresh webpage');
        });
    });
