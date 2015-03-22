#Mastering Async Javascript

When I first started to use node, my knowledge of Javascript was very basic and so I had a lot of trouble understanding callbacks and the event loop and especially, Async.

Now that I believe I have a firmer grasp of the two concepts, I want to revist some of the sticky parts of handling async code and maybe help out those who are just starting out.

I'm still learning a lot and so this is still very much a work in progress. If you feel I've misrepresented something feel free to let me know.

[Javascript's Event Loop](#javascripts-event-loop)
```javascript
//todoASYNC: Write post on Async Library
//todoASYNC: Write post on Promises
```

###Javascript's Event Loop
To begin, I highly recommend this JSConfEU talk given by Phillip Roberts on the topic. [Loupe](http://latentflip.com/loupe)

So, to briefly summarize:

1. Javascript (the runtime) is single threaded.

  This means that only a has single call stack and therefore can only execute a single block of code at a time. Until that block of code finishes, Javascript cannot do anything.


2. Node (also, the browser) is multi-threaded

  Node is a wrapper around V8, Google's Javascript Engine. It and other Javascript Engines are written in multi-threaded languages like C++.


2. The Event Loop

  Javascript's Event Loop works something like this:

    1. It does some internal maintenance.
    2. It checks to see if the stack is clear.
    3. If clear, it pulls a task out of the queue and runs it.**
    5. It repeats the cycle until it exhausts all tasks in the stack and queue.

  **If the task needs to be run at a future point in time, Javascript makes an api call to the engine that describe what and when things should be executed. How this is implemented depends on the engine.

  The engine then queues tasks and continues with the next step of the event loop.

###Review

What do you expect will happen when we run this code?

```javascript
function doAsync (input) {

  var result = 'Not Ready Yet';

  setTimeout(function(){
    result = input;
  }, 0);

  console.log(result);
}

doAsync('Finished');
```
What happens is:

1. event loop initializes
2. add doAsync to the stack and runs it
3. assign 'Not Ready Yet' to result
4. make api call with the function passed to setTimeout, node will put it in the task queue
5. doAsync logs 'Not Ready Yet'
6. the stack clears and the event loop does some maintenance
7. checks to see that the stack is clear
8. since the stack is clear, add task from event queue to stack and run it.
9. assign 'Finished' to result
10. clear the stack and repeat the event queue (which will terminate without any more tasks).


How about this?

```javascript
function doAsync (input, callback) {
  var result = 'Not Ready Yet';

  setTimeout(function(){
    result = input;
    callback(result);
  }, 0);

  console.log(result);
}

doAsync('Finished', function (result) {
  console.log(result);
});
```
What happens (at a higher level this time):

1. assign 'Not Ready Yet' to result
2. add the task to the queue
3. log 'Not Ready Yet'
4. grab task from queue and run it
5. assign 'Finished' to result
6. pass result to callback
7. log 'Finished'

###Callback Hell

Now that we understand the basics of how Javascript works, we can see why this callback pattern is so common when writing in Javascript.

```javascript
asyncOne(input, function (err, resultA) {
  if (err) console.error(err);

  asyncTwo(resultA, function (err, resultB) {
    if (err) console.error(err);

    asyncHell(resultB, function (err, yet) {
      if (err) console.error("All Hope Abandon Ye Who Enter");

      areWeDone(yet);
    });
  });
});

```

If the above code is hard to read fear not! Async Libraries and Promises to the rescue~

(WIP) In later posts, we'll get a feeling for how they work by writing our own mini-async-libraries.

Thanks for reading!
```javascript
next();
```