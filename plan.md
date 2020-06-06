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