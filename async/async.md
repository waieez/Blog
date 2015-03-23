#Write a miniAsync Library
###Mastering Async Javascript - p.2

Part 1 describes at a higher level how the Javascript Event Loop works.
Here, we'll see how async libraries help us to write code that looks synchronous by writing one ourselves!

Recall this beast from Part1

```Javascript
asyncOne(input, function (err, resultA) {
  if (err) console.error(err);

  asyncTwo(resultA, function (err, resultB) {
    if (err) console.error(err);

    asyncHell(resultB, function (err, yet) {
      if (err) console.error("All Hope Abandon Ye Who Enter");

      areWeDone(null, yet);
    });
  });
});

```

When done, we'll have code that looks like this!

```javascript

async.sequential(
  input, [
    asyncOne, 
    asyncTwo,
    //...
    asyncHeaven,
  ], done);


// expanded (not necessary for this example, but hopefully adds clarity)

async.sequential(
  input, [
    function (input, callback) {
      //we're passing input directly to asyncOne
      asyncOne(input, function (err, result) {
        if (err) callback(err, null);
        callback(null, result);
        //the callback here looks much like the callback that's wrapping it
      });
    },
    function (input, callback) {
      //therefore we can just pass the callback in directly as well
      asyncTwo(input, callback);
      //while we're at it, lets get rid of the wrapper too
    },
    //...
    //then we can do this!
    asyncHeaven,
  ], done);
//of course we'd have to be really careful about the function signatures
```

# mini-Async
Two of the most common tasks we'll want to abstract with our library are: 

1. executing a list of tasks in order until it is done (async.sequential)
2. performing an asynchronous task on a collection of arguments that resolves only when they're all complete (async.map)

With these two key peieces we can even perform a string of tasks on a collection of arguments!

First to make it easier on ourselves we have to make a couple assumptions,

1. Asynchronous functions have the following signature:
2. It calls the callback with an error or the result when it is done.

```Javascript
function doAsync (input, callback) {
  //do stuff
  callback(error, result);
}
```

###Challenge: Implement async.sequential

This function should be able to take an input, a list of functions, and a final callback (done).

It should execute the list of functions in order and pass the result of one to the next.

It should call done when everything has completed or a step returns an error.


```javascript
async.sequential = function(input, callbacks, done) {
  //pass input to first callback, if any
  //pass result of first callback to the next one
  //repeat until we run out of callbacks
  //pass result to done
}

//hint: use a recursive subroutine
```

###Next: Implement async.map

This function should be able to take an array, a task, and a final callback (done).

task takes two parameters (input, callback)

It should execute the task on every item in the array.

It should return an array with the result of each task mapped to the proper index.

```javascript
var async = {}
async.map = function (array, callback, done) {
  //iterate through each item in array
    //call the callback on every item
    //call done when the last item resolves
}
```

###Helper: doAsync

If you need a way to create async code to test your library, use this:

```javascript
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

// Example Usage:
function plusTwo (val) {
  return val + 2;
}
var asyncPlusTwo = doAsync(plusTwo);
```

###Solution: async.sequential

Here's one way to approach it.

```Javascript

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

```

###Solution: async.map

```javascript
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
```

#### Note: Why do we need an IIFE? 

> TLDR: We cannot directly pass i to the callback because the callbacks are invoked only when the stack clears. The value i references will then always equal length.

Recall the Event Loop.

The for loop blocks the stack and clears only when i >= length.

Although the callback appears to exist within the for loop and has closure scope access to i, the callback is actually passed to the event queue.

Even if the value is resolved immeditaely, it doesnt get the chance to run until the for loop has cleared the stack.

The value of i at that point in time will always be equal to length.

By passing i to an IIFE, we create a new reference that points to the value of i at that specific point in the for loop.

###Let's Get Funky!
Even though we've only written two methods, we can get very creative without sacrificing clarity.

```javascript
var asyncPlusTwo = doAsync(plusTwo); // Helper: doAsync (described above)
var asyncPlusTwos = [asyncPlusTwo, asyncPlusTwo, asyncPlusTwo, asyncPlusTwo, asyncPlusTwo];

function log (err, result) {
  if (err) console.error(err);
  console.log(result);
}

//For Each Item in the array, execute a list of async functions
//async.map(input, callback, done);
async.map(
  array,
  function (input, callback) {
    async.sequential(input, asyncPlusTwos, callback);
  },
  log
)// logs [11,12,13,14,15,16,17,18,19,20]

```

##Welcome to Callback Heaven!

Enjoy your stay.

```javascript
next()
```