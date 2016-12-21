# Time Complexity - BigO Notation

### work in progress

The end goal here is to measure the time complexity of a function.

For now only tests a function with one argument. Solving this is in progress.

### installation
```bash
npm install
bower install
npm install -g http-server
```

### setup

First export the function you want to test in the file `bin/underTest.js`:
```javascript
"use strict";

module.exports = function myFunction(A) {
  ...
};
```

Configuration is done in the file `index.js`. Currently you can only set the
number of iterations and the initial arguments.
```javascript
"use strict";

const config = {
  itterate: 1000,
  arguments: [34,6298,234,2983,234,98,234],
}
...
```

### Running
In first terminal
```bash
node index.js
```
In second terminal (http-server can be installed with `npm install -g
http-server`)
```bash
http-server
```

### Roadmap

 - test with more than one argument
 - allow user defined generator's for argument incrementation.
 - remove noise from chart
 - and hopefully something like: http://bl.ocks.org/simenbrekken/6634070 with start/stop btn's
