function LinkedList () {
  this.head = null;
  this.tail = null;
}

function Node (value) {
  this.value = value;
  this.next = null;
  this.prev = null;
}

LinkedList.prototype.add = function (value) {
  var node = new Node(value);
  if (!this.head) {
    this.head = node;
  } else {
    node.prev = this.tail;
    this.tail.next = node;
  }
  this.tail = node;
};


LinkedList.prototype.each = function (callback) {
  var node = this.head;
  var prev = null;
  while (node) {
    callback(node);
    node = node.next;
  }
};

LinkedList.prototype.filter = function (test, callback) {
  this.each(function (node) {
    if (test(node)) {
      callback(node);
    }
  });
};

LinkedList.prototype.delete = function (test) {
  var context = this;
  this.filter(test, function (node) {
    //make sure we handle deleting heads
    if (context.head === node) {
      context.head = node.next;
      if (context.head) {
        context.head.prev = null;
      }
    }
    //make sure we handle deleting tails
    if (context.tail === node) {
      context.tail = node.prev;
      if (context.tail) {
        context.tail.next = null;
      }
    }

    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
  });
}

LinkedList.prototype.update = function (test, update) {
  this.filter(test, function (node) {
    update(node);
  });
}

var ll = new LinkedList();

ll.add(5);
ll.add(6);
ll.add(2);

ll.delete(function (node) {
  if (node.value == 2) {
    return true;
  } else {
    return false;
  }
})

ll.update(function (node) {
  return true
  // if (node.value < 3) {
  //   return true;
  // } else {
  //   return false;
  // }
}, function (node) {
  node.value = node.value * 5;
})

// delete all nodes > 2
// transform all nodes <= 2 * 5

// head === tail
// head.value = 10
// head.next = null

console.log(ll.head, ll.tail, ll.head === ll.tail, ll.head.value === 10);
ll.each(function (node) {
  console.log(node.value);
});
