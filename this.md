#Bind, Call, and Apply THIS.

##The Parameter This:

'this' is one of Javascript's biggest gotcha's and it is one of the most misunderstood concepts in javascript.

Possibly the best explaination of the parameter 'this' can be found [here](https://www.udacity.com/course/ud015), as explained by Hack Reactor's co-founder, Marcus Phillips.

##TL;Didn't Watch:

If you understand how functions are called in Javascript, the key takeaway is that 'this' refers to whatever is 'left of the dot' 90% of the time.

'this' simply binds to whatever is left of the dot at call-time. If there is nothing to the left, it is actually bound to the global object (eg. fn() becomes window.fn()).

##Bind, Call, Apply:

The parameter 'this', like any positional parameter you can pass to javascript functions is simply a parameter.

There are serveral ways to explicity set the parameter 'this', each with their own use cases.

The first parameter in bind, call, or apply is the object you wish to refer to as 'this'.


##Apply and Call

Apply and Call differ only in the arguments it takes.

```javascript
//Apply takes an array as it's second argument.

var array = [arg1, arg2, arg3...];
fn.apply(this, array);

//While call accepts any number and type of arguments after 'this'.
fn.call(this, arg1, arg2, arg3...);
```

For example:

```javascript
function speak (greeting) {
  return this + ' goes ' + greeting;
}

speak.apply('dog', 'woof');
// returns 'dog goes woof'

speak.call('cat','meow');
// returns 'cat goes meow'
```

##Bind

Bind returns a function that has the parameter 'this' and any other positional arguments passed in bound by the returned function. You can then invoke the returned function and pass in any other additional arguments.

```javascript
var returnedfn = fn.bind(this, arg1);

returnedfn(arg2, arg3...);
```

Can you imagine what the following lines of code will return?

```javascript
var whatDoesTheFoxSay = speak.bind('fox');

whatDoesTheFoxSay('Wa-pa-pa-pa-pa-pow!');
whatDoesTheFoxSay('Hatee-hatee-hatee-ho!');
```

This pattern makes creating and invoking similar functions very convenient.

I hope you will enjoy 'this' and find 'this' very useful.