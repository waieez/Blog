##Function.prototype.bind()

Understanding what happens in when we use native methods is very important as a software engineer.

!['Apparantly, writing fn.bind is an interview question.'](http://i.imgur.com/uoocfSA.jpg)

In this post we'll review call, and apply and use it to write our own fn.bind.

####Review

In my post on bind, call, and apply this, I gave an overview of how you might use call and apply in order to lock in the value for this.

This is behavior useful when you want to invoke a function with a specific context (the value of 'this').

```javascript
fn.call(context, arg1, arg2...)
fn.apply(context, [arg1, arg2...]);
```

But what if you wanted to invoke a particular function with additional parameters bound?

Easy!
```javascript
var boundFn = fn.bind(context, arg1, arg2);
boundFn();
```
The benefit of is that you can now invoke boundFn any number of times and it will always have the context and parameter values you passed in to fn.bind.

So how do we recreate this behavior?


Recall that fn.bind:

1. is a method on Function.prototype.
2. returns a new function with the context and additional parameters bound to the returned function.
3. the returned function should be able to accept additional parameters


####Challenge, implement fn.bind

```javascript
function speak (greeting) {
  return this + ' goes ' + greeting;
}

var whatDoesTheFoxSay = speak.bind('fox');

whatDoesTheFoxSay('Wa-pa-pa-pa-pa-pow!');
//fox goes Wa-pa-pa-pa-pa-pow!
whatDoesTheFoxSay('Hatee-hatee-hatee-ho!');
//fox goes Hatee-hatee-hatee-ho!
```
hint: you'll also need to understand [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice), and the [Arguments object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)

##Solution

```javascript
Function.prototype.bind = function(context) {

  var func = this; 
  var oldArgs = Array.prototype.slice.call(arguments, 1);

  return function(){

    var newArgs = Array.prototype.slice.call(arguments);
    var allArgs = oldArgs.concat(newArgs);

    return func.apply(context, allArgs);
  };
};
```

Annotated
```javascript
//javascript allows us to pass in any number of parameters
//the first one passed to bind is always the context
Function.prototype.bind = function(context) {
  //first we save the function we want to invoke
  var func = this; 

  //then we extract all the additional arguments passed into bind
  var oldArgs = Array.prototype.slice.call(arguments, 1);

  //we need to return a function
  return function(){

    //the returned function can recieve additional arguments,
    //which will be accesible via the arguments object
    var newArgs = Array.prototype.slice.call(arguments);
    
    //note: the arguments object referenced here is not the same as the one above it.
    //recall that variables declared in a function 
    //will shadow variables declared outside its scope

    //combine the additional parameters passed in the parent scope
    //with the parameters passed in the child scope
    var allArgs = oldArgs.concat(newArgs);

    //retrieve the func and context passed in fn.bind via closure scope
    //invoke the function passing in the context and all arguments
    //supplied from both scopes using fn.apply()

    //now everytime we invoke the returned function, we get the result of:
    return func.apply(context, allArgs);
  }
};
```
