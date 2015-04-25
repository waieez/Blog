#Big O

Big O notation is an easy way to make comparisons about the speed/additonal memory use of different algorithms relative to the input. 

It basically reads "the worst case time/space complexity for this algorithm is: X".

In order from fastest to slowest (also least to most memory use):
<pre>
O(1)        Constant
O(log n)    Logrithmic
O(n)        Linear
O(n log n)  Linearithmic (though I strongly prefer just n log n)
O(n^2)      Polynomial
O(2^n)      Exponential
</pre>

To go into more depth, lets compare the time/space complexity of an array vs a linked list.

Insert/Remove

You can imagine that an array of length 5 as continuous block of space. Each block inside the array has the same 'width'.

```javascript  
var array = [ 0 , 1 , 2 , 3 , 4 ];
var retrieved = x[4] // 4

var linkedlist = { head: [0, {1}], tail:[4, {null}] }
// somewhere in memory in no particular order
// [3, {4}] [4, {null}] [0, {1}] []
```

In order to access a value inside the array, all the computer has to do is calculate the distance from the beginning of the block of memory to the particular index we are interested in.

Since this calculation can be done in constant time, accessing a value in an array takes at most a constant amount of work.

Linked Lists are different from arrays in two ways:
  1. The list does not have to take up a continuous block of memory 
    * also does not have to be in any particular order.
  2. Each node takes up an additional space per pointer.

The result of this difference in datastructure