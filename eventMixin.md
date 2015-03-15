##Write A Simple Event Mixin

Event systems are great for writing and describing async code. It allows us to express and communicate control flow in a way that is cleaner and much more intuitive by using words like 'event', 'emit/trigger', and 'listen'.

If you've never took the time to dig around, you might think there is some complicated logic behind these systems (at least... I did). However, the concepts behind event systems are relatively simple.

Understanding this will help you to event systems like those used in [node.js](https://nodejs.org/api/events.html) and frameworks like [Backbone.js](http://backbonejs.org/).

Lets start by writing our own simple mixin!

####Challenge: Implement Event Mixin:
1. Each event can have multiple listeners for that event.
2. When the event is triggered, all listeners for that event are executed.

```javascript
var thing = {};
mixEvents(thing);

thing.on('fire', function(){
   console.log('halp!');
   thing.onFire = true;
});

thing.on('fire', function(item){
  if (item === 'fire extinguisher') {
    thing.onFire = false; 
    console.log('thanks dude!');
  } else {
    console.log("I need something to put out the fire!!");
  }
});

thing.trigger('fire');
console.log(thing);
thing.trigger('fire', 'fire extinguisher');
console.log(thing);

//Should Log:
//halp!
//I need something to put out the fire!!
//{onFire: true, on:[Fn], trigger:[Fn]}
//halp!
//thanks dude!
//{onFire: false, on:[Fn], trigger:[Fn]}
```

####Solution:

An 'event' is just a key.

A 'listener' is a callback that's associated with that key.

Therefore when we 'trigger' the event, we invoke every callback associated with that key.

Here's one way to approach it:

```javascript 

var mixEvents = function(obj) {
  var events = {};

  obj.on = function(event, cb){
    events[event] ? events[event].push(cb) : events[event] = [cb];
  }

  obj.trigger = function(event){
    var args = Array.prototype.slice.call(arguments, 1);
    var reactions = events[event] || [];
    reactions.forEach(function(cb){
      cb.apply(obj, args);
    });
  }

  return obj;
};
```

Annotated

```javascript 

var mixEvents = function(obj) {
  //store listeners as event: [cb, cb, cb..];
  var events = {};

  obj.on = function(event, cb){
    events[event] ? events[event].push(cb) : events[event] = [cb];
  }

  obj.trigger = function(event){

    //some listeners might take arguments, lets pass them via apply
    var args = Array.prototype.slice.call(arguments, 1);

    //grabs an array of callbacks assicated with the event
    var reactions = events[event] || [];

    //invokes each cb with the obj as context and 
    //any additional arguments passed in trigger.
    reactions.forEach(function(cb){
      cb.apply(obj, args);
    });
  }

  return obj;
};

```