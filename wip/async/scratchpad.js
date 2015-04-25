function Node (callback) {
    this.prev = null;
    this.next = null;
    this.callback = callback;
}

Node.prototype.link = function (node1, node2) {
  node1.next = node2;
  node2.prev = node1;
}

function LinkedList () {
  this.head = null;
  this.tail = null;
};

LinkedList.prototype.push = function (callback) {
  var list = this;
  var node = new Node(function (err, result) {
    var context = this;
    
    if (context.next) {
      callback(result, function (err, res) {
        if (err) context.next.callback(err);
        if (context.next) {
          context.next.callback(null, res);
        }
      });  
    }
  });

  if (this.head === null) {
    this.head = node;
  } else {
    this.tail.link(this.tail, node);
  }
  this.tail = node;
}


LinkedList.prototype.insert = function (prev, node, next) {
  if (prev){
    this.link(prev, node);
  }
  if (next) {
    this.link(node, next);
  }
}

Node.prototype.remove = function () {
  if (this.prev && this.next) {
    this.link(this.prev, this.next);
  } else if (this.prev) {
    this.prev.next = null;
  } else {
    this.next.prev = null;
  }
  this.next = null;
  this.prev = null;
}

LinkedList.prototype.pop = function () {
  var node = this.tail;
  this.tail = node.prev;
  node.remove();
  return node.callback; 
}

LinkedList.prototype.unshift = function (callback) {
  var node = new Node(callback);
  if (this.head === null) {
    this.head = node;
  } else {
    this.head.link(node, this.head);
  }
  this.head = node;
}

LinkedList.prototype.shift = function () {
  if (!this.head) { return null };
  var node = this.head;
  this.head = node.next;
  node.remove();
  return node.callback; 
}

function convertLinkedList (array) {
  var callbacks = new LinkedList();
  array.forEach(function (callback) {
    callbacks.push(callback);
  });
  return callbacks;
}


function logResult (map) {
  console.log(map);
}


var array = [1,2,3,4,5,6,7,8,9,10];

var asyncPlusTwos = [asyncPlusTwo, asyncPlusTwo, asyncPlusTwo, asyncPlusTwo, asyncPlusTwo];
async.sequential(0, asyncPlusTwos, logResult);


//asyncMap(input, callback, done);
async.map(
  //input
  array,
  //callback
  function (input, callback) {
    async.sequential(input, asyncPlusTwos, function (result) {
      callback(null, result);
    });
  },
  //done
  function (map) {
    console.log(map);
  }
)

async.sequential([0,1,2,3,4],
  [
    function (array, callback) {
      async.map(array, asyncPlusTwo, function (result) {
        callback(null, result);
      });
    },
    function (array, callback) {
      async.map(array, asyncPlusTwo, function (result) {
        callback(null, result);
      });
    },
    function (array, callback) {
      async.map(array, asyncPlusTwo, function (result) {
        callback(null, result);
      });
    }
  ],
  function (result) {
    console.log(result);
  }
)

async.sequential(0, [
  doAsync(function (input) {
    return input + 1;
  }),
  doAsync(function (input){
    return input - 2;
  })
  ],
  function (result) {
    console.log(result);
  }
)