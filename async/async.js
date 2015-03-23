// Note: Don't worry too much about how this function works.
// It's simply to model the common interface for interacting with asynchronous code

// Turn any function into one that executes asynchronously
function doAsync(func, context) {
  context = context || null;

  return function (args, callback) {
    var random = Math.random() * 1000;
    // when invoked, this function will call setTimeout
    setTimeout(function(){// we delegate this task to the event queue via setTimeout

      // if the stack is clear: we invoke func and pass the result to our callback
      var result = func.call(context, args);

      // this checks if the callback returned an error
      // after which we invoke the callback with a node-style callback signature
      if (result.constructor === Error) {
        var err = new Error('Async Function Returned An Error');
        callback(err, null);
      } else {
        callback(null, result);
      }
    }, random);
  }
}

// If this pattern is a little confusing, please refer to my post on bind.

function plusTwo (val) {
  return val + 2;
}

function log (err, result) {
  if (err) console.error(err);
  console.log(result);
}


// Note: for brevity, lets assume callbacks is always an array 
// and we are always given a done callback
// we could handle inputs but I think it distracts from the lesson

var async = {};
async.sequential = function (input, callbacks, done) {

  var index = 0; //callbacks is an array of callbacks, start at index 0
  next(input, index); //start the chain of sequential async calls

  function next (input, index) {
    var cb = callbacks[index];// with each call, get the current callback
    if (cb) {// if exists, execute this callback

      //recall async tasks take two arguments: (input, callback)
      //when done, it calls the callback with the pattern: (err, result)
      cb(input, function (err, result) {
        if (err) {
          done(err, null); // if error, skip directly to error
        } else {
          next(result, ++index);// otherwise, pass result to next callback
        }
      });
    } else {
      done(null, input);
    }
  } 
}

async.map = function (array, task, done) {
  var count = 0;
  var map = [];
  var length = array.length;
  for (var i = 0; i < length; i++) {

    (function (index) {
      task(array[index], function (err, result) { 
        if (err) done(err, null); // immediately invoke done on errors

        map[index] = result; // otherwise insert the result at the appropriate index

        if (++count === length) { // increment the counter for the number of resolved callbacks
          done(null, map); // invoke done on map only when all have completed
        }
      });
    })(i);
  }
}

// Example Usage:
var asyncPlusTwo = doAsync(plusTwo);
var asyncPlusTwos = [asyncPlusTwo, asyncPlusTwo, asyncPlusTwo, asyncPlusTwo, asyncPlusTwo];

var array = [1,2,3,4,5,6,7,8,9,10];

async.sequential(0, asyncPlusTwos, log); // logs 10

async.map(array, asyncPlusTwo, log); // logs [3,4,5,6,7,8,9,10,11,12]

//Let's get Funky!

//For Each Item in the array, execute a list of async functions

//async.map(input, callback, done);
async.map(
  array,
  function (input, callback) {
    async.sequential(input, asyncPlusTwos, callback);
  },
  log
)// logs [11,12,13,14,15,16,17,18,19,20]



//Similar, except we cannot proceed with the next task until all values have resolved
//also creates O(n) intermediate arrays

//async.sequential(input, callbacks, done);
async.sequential(
  array, [
  function (array, callback) {
    async.map(array, asyncPlusTwo, callback);
  },
  function (array, callback) {
    async.map(array, asyncPlusTwo, callback);
  }
  ], log
)// logs [5,6,7,8,9,10,11,12,13,14]