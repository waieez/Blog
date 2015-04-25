RUST?



&T  Reference Allows one or more references to read T
&mut T  Mutable Reference Allows a single reference to read and write T
Box<T>  Box Heap allocated T with a single owner that may read and write T.
Rc<T> "arr cee" pointer Heap allocated T with many readers
Arc<T>  Arc pointer Same as above, but safe sharing across threads
*const T  Raw pointer Unsafe read access to T
*mut T  Mutable raw pointer Unsafe read and write access to T






Array 
  immutable by default
  [<T>; len]

Vector
  let v:<T> = vec![x,y,z]

Slice 
  &[T]
  let x:i32 = [1,2,3,4,5];
  //create 'reference/view'
  &x[0..2] => [1,2]

Str
String

Numbers, signed/unsignted ints floats

#Tuples
  ordered list of fixed size.

  access fields via destructuring let
  let (x, y, z) = (1, 2, 3) // x == 1, z == 3
  let (<T>,..) = (x, y, z);

#Structs

  struct Name<T> {
    x: <T>,
    y: <T>,
    another_struct: <struct>
  }

  struct Tuple(<T>,<T>)

  access via Name.x

#TupleStruct/NewType
  give names to positions

  //newtpye pattern
  struct Thing (<T>); instances have has type thing instead of <T>


#Generics

  struct Pair<T> {
    first: T,
    second: T
  }

  fn fnname<T>(pair: Pair<T>) -> Pair<T> {
    
  }

  explicity specialize
  Pair<char...>
  fnname<char>(pair);
  
  `<T>` Must precede the type to remain generic
  impl <T> GenericTup<T> {}

Enums

  enum Character {
    Digit(i32),
    Other,
  }
  access?
  Character::Other

Boxes
  values are allocated to stack by default,
  van allocate to heap if boxed
  box is a smart pointer to a heap allocated value of type T
  when it goes out of scope, destructor called, obj destroyed, heap freed.

  Box<T>,

Traits

  WAT http://rustbyexample.com/trait.html
  trait Animal {
    fn ()
    fn name
  }

  struct Sheep {

  }

  impl Animal for Sheep

impl
  &self is short for self: &Self where Self ref the type of struct
  self short for Self, consumes obj

Control flow
Macros
Concurrency
Pointers
Lifetimes

  WAT

Ownership/Mutability
  T vs &T
    MOVE - if passed by value, ownership transfer, prev owner can't be 
    eg:
    let a = 5 // a has ownership
    let b = a // ownership transfered, a no longer useable

    let a = 5
    let b = &a //ownership not transfered.

  &mut T 
    borrow w/ r/w access

  cant borrow immutable, transfer ownership first?
  let mut creates mutable copy?

Freezing
  borrowed vars can't be used until all borrowed ref go out of scope

ref pattern



* - dereferencing
Matching

Crates
Modules

Associated Types

Bounds
  WAT

Drop
  WAT