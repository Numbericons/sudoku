* Grid
  Made as an array of 9 boxes
    <!-- With within boxes subarray containing 3 arrays of rows -->
    Sub array of 9 squares


* Correct Board
  Since already have an array of 81 squares
    Which makes it easy to place into boxes and box rows etc.
      When placing values, check rows above and columns to the right
  Current:
    Accounts for boxes having all #'s
    All in same places
    Doesnt account for contraints:
      Row
      Column
  [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9]
   1 1 1             1 1 1             1 1 1
   Idea: outer loop relates to first row
  

* Get Col
  Create a length max for the return array based on which box we are in;

* Element Swap to correct board
  1. Get Column of position you can't place
  2. Adjust while loop in make square
    1. Needs to check nTried and disqualify ones in current row/column
  2. Swap the required element (row/box) in a column above and see if it can swap with an element in its respective row
    1. Idea: If not, try within current row [?]
    2. Noticing that could be better to just try finding the required element and checking swaps
      1. So not necessarily within the current column (j)
      2. Accounts for broken box #7 situation
      3. Also can swap element within its column
  3. Need helpers
    4. Check if 2 elements can legally swap
      1. Has its own helper to check legal position for an element to move
        1. Check if positions column or row contains the number
          1. Careful not to validate duplicate numbers within a box in the process