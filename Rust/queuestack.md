#My JS is Getting Rusty

Our expedition into the heart of Rust has just begun.

Below is a simple implementation of a Queue using two Stacks.

For JS natives trying to pick up the language, I hope this could be a useful reference.

Rust 1.0


Stack

```javascript
var Stack = function () {
  this.storage = [];
}

// Totally wouldn't write it this way. But it's helpful to think about.
Stack.prototype = {

  constructor: Stack,

  push : function (val) {
    this.storage.push(val);
  },

  pop : function () {
    return this.storage.pop();
  },

  size: function () {
    return this.storage.length;
  }
}
```

```rust
struct Stack<T> {
    storage: Vec<T>
}

impl<T> Stack<T> {
    fn new() -> Self {
        Stack{storage: vec![]}
    }

    fn push(self: &mut Self, val:T) {
        self.storage.push(val);
    }

    fn pop(self: &mut Self) -> Option<T> {
        self.storage.pop()
    }

    fn size(&self) -> usize {
        self.storage.len()
    }
}
```

Queue (using two stacks)

```javascript

var Queue = function () {
  this.inbox = new Stack();
  this.outbox = new Stack();
}

Queue.prototype = {
  constructor: Queue,

  enqueue: function (val) {
    this.inbox.push(val);
  },

  dequeue: function () {
    if (this.outbox.length == 0) {
      var done = false;
      while(!done) {
        var val = this.inbox.pop();
        if (val !== undefined) {
          this.outbox.push(val);
        } else {
          done = true;
        }
      }
    }
    return this.outbox.pop();
  }
}
```

```rust
struct Queue<T> {
    inbox: Stack<T>,
    outbox: Stack<T>,
}

impl<T> Queue<T> {
    fn new() -> Self {
        let inbox:Stack<T> = Stack::new();
        let outbox:Stack<T> = Stack::new();
        Queue{inbox:inbox, outbox:outbox}
    }

    fn enqueue(self: &mut Self, val:T) {
        self.inbox.push(val);
    }

    fn dequeue(self: &mut Self) -> Option<T> {
        if self.outbox.size() == 0 {
            let mut done:bool = false;
            while !done {
                match self.inbox.pop() {
                    Some(x) => self.outbox.push(x),
                    None => done = true,
                }
            }
        }
        self.outbox.pop()
    }
}
```