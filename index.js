"use strict";

const fs = require('fs'),
  bigoClass = require('./lib/bigo'),
    bigo = new bigoClass({
      itterate: 100,
    });

bigo
  .args([34,6298,234,2983,234,98,234])
  .run()
  .then(runs => {

    // model for d3
    const d3Runs = runs.map((a, i)=>{
      return {
        size: a.args.length,
        time: a.time.ms,
      };
    });
    console.log(d3Runs);
    console.log(d3Runs[0]);

    fs.writeFile('data.json', JSON.stringify(d3Runs), e=>{
      if(e) throw Error('Error writing to file: \n\t'+e.message);
      console.log('Analysis complete, refresh webpage');
    });
  });
