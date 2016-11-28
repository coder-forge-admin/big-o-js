# Time Complexity - BigO Notation

### work in progress

The end goal here is to measure the time complexity of a function. Solving the
problem will probably involve:

```javascript

// set params
const config = {
    itterate: 100,
    reducer: function(arg, i){
        // @param arg previous itterations arguments
        // @param i current argument index

        if(i===1) // 2nd arg
            arg.push(arg[arg.length-1]+1);

        return arg;
    }    
}

// build bigO
const bigOClass = require('./lib/big-o-js'),
    bigO = new bigOClass(config);

// run
bigO
    .args([1,2],[1,2,3,4])
    .run()
        .then((result) => {

            // graph results
        });
```

With expected setters
```javascript
big0.itterate = 10;
big0.reducer = (arg)=>{ return arg;};

big0
    .args([1,2])
    .run()
```
