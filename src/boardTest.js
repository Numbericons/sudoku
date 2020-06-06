function randIdx(arr) {
  return Math.floor(Math.random() * arr.length);
}

function sample(numbers) {
  const idx = randIdx(numbers);
  return numbers.splice(idx, 1)[0];
}

function combine(arr1,arr2) {
  return (arr1.join("")+arr2.join("")).split("").map(str => parseInt(str));
}

function getCols(numbers, arr,len) {
  let nextCols = [];

  if (numbers.length % 3 < 2) nextCols = getCol(arr, len, 1);
  if (numbers.length % 3 === 0) combine(nextCols, getCol(arr, len, 2));
  return nextCols;
}

function common(cols,row) {
  for (let z=0;z<cols.length;z++) { if (row.includes(cols[z])) return cols[z] };
  return false;
}

function splPriority(numbers,nextRow,priority){
  const numbIdx = numbers.indexOf(priority);
  numbers.splice(numbIdx,1);
  const rowIdx = nextRow.indexOf(priority);
  return nextRow.splice(rowIdx,1)[0];
}

function sampleNext(numbers, nextRow, arr){
  const len = numbers.length;
  let nextCols = getCols(numbers, arr,len);
  const priority = common(nextCols, nextRow);
  if (common(nextCols, nextRow)) return splPriority(numbers, nextRow, priority);
  const valid = nextCols.filter(el=> numbers.includes(el)); //flag, not numbers?
  // let valid = [];
  // for (let z=0; z<nextCols.length;z++) {
  //   if (numbers.includes(nextCols[z])) valid.push(nextCols[z]); //flag, not numbers?
  // }

  if (nextRow.length || valid.length) {
    let el;
    if (valid.length) {
      el = valid[randIdx(valid)];
      // let idx = nextRow.indexOf(el); not needed with priority check
      // nextRow.splice(idx,1)[0];
    } else {
      let idx = randIdx(nextRow);
      el = nextRow.splice(idx,1)[0];
    }
    const numbIdx = numbers.indexOf(el);
    return numbers.splice(numbIdx, 1)[0];
  } else {
    return sample(numbers);
  }
}

function getStop(i){
  if (i < 3) {
    return 0;
  } else if (i < 6) {
    return 27;
  } else {
    return 54;
  }
}

function getRow(arr, len, i,j) {
  if (!arr.length) return arr;
  let ret = [];
  const start = (len**2 * i) - 9 + j;
  const stop = getStop(i);
  for (let x = start; x >= stop; x -= 9) {
    ret.push(arr[x][0])
    ret.push(arr[x + 1][0])
    ret.push(arr[x + 2][0])
  };
  return ret;
}

function getCol(arr, len, offset=0) {
  if (!arr.length) return arr;
  let ret = [];
  let prevBoxCols = 21;  //diff between last row of prev box and first row of current box

  //2nd row within box so need to subtract 3 to line up with prev box cols
  if (len < 6) prevBoxCols += 3; 
  if (len < 3) prevBoxCols += 3;

  const start = arr.length + offset - prevBoxCols;
  for (let x = start; x >= 0; x -= 3) { ret.push(arr[x][0]) };
  return ret;
}

//go by length of numbers array to determine which subRow within current box
//then need the columns from above boxes, if applicable

function makeSquares(len = 3) {
  let arr = [];
  for (let i = 0; i < len ** 2; i++) {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let row;
    let nextRow = [];
    for (let j = 0; j < len ** 2; j++) {
      if (arr.length === 24) debugger;
      if (arr.length === 35) debugger;
      if (arr.length === 54) debugger;
      if (!numbers.length) debugger;
      if (j % 3 === 0) row = getRow(arr, len, i, j);
      if (j === 3) nextRow = getRow(arr,len,i,j+3);
      //only relevant since others already used in current box
      nRow = nRow.filter(el=> numbers.includes(el));
      const nRowCopy = nRow.splice();
      let num = j > 2 ? sampleNext(numbers, nRow,arr) : sample(numbers);
      let col = getCol(arr, numbers.length);
      while (row.includes(num) || col.includes(num)) {
        //two fixes 
        // if (!numbers.length) break;
        numbers.push(num);
        nRow.length ? nRow.push(num) : 
        num = j > 2 ? sampleNext(numbers, nRow,arr) : sample(numbers);
      }
      arr.push([num, true]);
    }
  }
  return arr;
}

let result = makeSquares();
console.log(result);

//creates first grid-row of 3 boxes and then getRow breaks

console.log('box 1:')
console.log(arr.map(el=>el[0]).slice(0,3));
console.log(arr.map(el=>el[0]).slice(3,6));
console.log(arr.map(el=>el[0]).slice(6,9));
console.log('box 2:')
console.log(arr.map(el=>el[0]).slice(9,12));
console.log(arr.map(el=>el[0]).slice(12,15));
console.log(arr.map(el=>el[0]).slice(15,18));
console.log('box 3:')
console.log(arr.map(el=>el[0]).slice(3*6,3*7));
console.log(arr.map(el=>el[0]).slice(3*7,3*8));
console.log(arr.map(el=>el[0]).slice(3*8,3*9));
console.log('box 4:')
console.log(arr.map(el=>el[0]).slice(3*9,3*10));
console.log(arr.map(el=>el[0]).slice(3*10,3*11));
console.log(arr.map(el=>el[0]).slice(3*11,3*12));
console.log('box 5:')
console.log(arr.map(el=>el[0]).slice(3*10,3*11));
console.log(arr.map(el=>el[0]).slice(3*11,3*12));
console.log(arr.map(el=>el[0]).slice(3*12,3*13));
console.log('box 6:')
console.log(arr.map(el=>el[0]).slice(3*11,3*12));
console.log(arr.map(el=>el[0]).slice(3*12,3*13));
console.log(arr.map(el=>el[0]).slice(3*13,3*14));
console.log('box 7:')
console.log(arr.map(el=>el[0]).slice(3*12,3*11));
console.log(arr.map(el=>el[0]).slice(3*13,3*12));
console.log(arr.map(el=>el[0]).slice(3*14,3*13));
console.log('box 8:')
console.log(arr.map(el=>el[0]).slice(3*13,3*14));
console.log(arr.map(el=>el[0]).slice(3*14,3*15));
console.log(arr.map(el=>el[0]).slice(3*15,3*16));
console.log('box 9:')
console.log(arr.map(el=>el[0]).slice(3*16,3*17));
console.log(arr.map(el=>el[0]).slice(3*17,3*18));
console.log(arr.map(el=>el[0]).slice(3*18,3*19));