Using Angular's $http and $q.all to gather data from multiple ajax requests.
Hello There?!.

Problem:
From an array or data, make an ajax request using data from each element and pass them to another promise.

I wasn't familiar with promises and had a lot of trouble understanding how to write this code.

Callback style

```javascript
  var asyncMap = function (array, cb, done) {
    var map = [];
    for (var i = 0; i < array.length; i++) {
      (function(index){
        map[index] = cb(array[index]);
      })(i)
    }
  }
```

Promises

```javascript
  var promises = array.map(function(data){
    return $q(function(resolve, reject){
      
    });
  });
```