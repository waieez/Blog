##N-Queens and Algorithm Design

I had a blast working with [Eric Liu](https://github.com/drceric) designing and iteratively optimizing our algorithm for [counting N-Queens](http://en.wikipedia.org/wiki/Eight_queens_puzzle#Counting_solutions).

###Version 0
Our first algorithm was a recursive backtracking algorithm that was relatively simple to reason and code. Our experience working on this version helped to solidify the key components we would need to implement a nonrecursive backtracking solution with several optimizations.

###Version 1
1. Use a set of arrays to check for row, column and diagonal conflicts.
2. Use a stack to store positions of placed queens instead of a matrix that represented the state of the board.

###Version 2
3. Leverage the symmetry of the board to reduce the number of starting positions by half to obtain the final count. (The middle column is not doubled for odd N boards).

###Version 3
4. Use webworkers to parallelize the executions
We only had to make a couple insertions to our previous code so that each worker would work on a single starting position.

Using asynchronus map reduce, we collect the returned count from each worker.
In order to leverage symmetry, we only needed to create N/2 workers (rounded up) and double the count returned (except for the middle column for odd N boards).

###Final Results
+ Version 2 for N = 14 finishes in ~25seconds
+ Version 3 for N = 14 finishes in ~7seconds
+ Version 3 for N = 15 finishes in ~42seconds

##Can we do better?
Although there are certainly more optimizations we could employ to make the algorithm faster, they will come at a cost of greater code complexity while still being constrained by the time complexity of the backtracking algorithm.

I look forward to revisiting N Queens with a better algorithm.

Regardless, HIGHFIVE Eric!