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
  2. Swap the required element (row/box right?) in a column above and see if it can swap with an element in its respective row
  3. Need helpers
  4. Check if eles can swap
  5. Check if new/old positions are ok for elements to help swap check