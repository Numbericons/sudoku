function randIdx(arr) {
  return Math.floor(Math.random() * arr.length);
}

function sample(numbers) {
  const idx = randIdx(numbers);
  return numbers.splice(idx, 1)[0];
}

// function combine(arr1,arr2) {
//   return (arr1.join("")+arr2.join("")).split("").map(str => parseInt(str));
// }

function getCols(numbers, arr,len) {
  let nextCols = [];
  const secondCol = [8,5,2];
  const nLen = numbers.length;
  if (nLen % 3 === 0 || secondCol.includes(nLen)) nextCols = getCol(arr, numbers.length, 1);
  if (nLen % 3 === 0) nextCols = nextCols.concat(getCol(arr, numbers.length, 2));
  // if (nLen % 3 === 0) nextCols = combine(nextCols, getCol(arr, numbers.length, 2));
  return nextCols;
}
//when 9,6,3 we want both when 8,5,2 we want 2nd and when 7,4,1 dont want

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

function sampleNext(numbers, nRow, nextCols, row){
  const priority = common(nextCols, nRow);
  if (priority) return splPriority(numbers, nRow, priority);
  const valid = nextCols.filter(el=> numbers.includes(el) && !row.includes(el)); //flag, not numbers?

  if (nRow.length || valid.length) {
    let el;
    if (nRow.length) {
      let idx = randIdx(nRow);
      el = nRow.splice(idx,1)[0];
    } else {
      el = valid[randIdx(valid)];
    }
    // if (valid.length) {
    //   el = valid[randIdx(valid)];
    //   // let idx = nRow.indexOf(el); not needed with priority check
    //   // nRow.splice(idx,1)[0];
    // } else {
    //   let idx = randIdx(nRow);
    //   el = nRow.splice(idx,1)[0];
    // }
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
  let prevBoxCols = 21;  //diff between curr row and last row of prev box
  //2nd row within box so need to subtract 3 to line up with prev box cols
  if (len < 7) prevBoxCols += 3; 
  if (len < 4) prevBoxCols += 3;

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
    let nRow = [];
    for (let j = 0; j < len ** 2; j++) {
      // if (arr.length === 21) debugger;
      // if (arr.length === 35) debugger;
      if (!numbers.length) debugger;
      if (j % 3 === 0) row = getRow(arr, len, i, j);
      if (j === 3) nRow = getRow(arr,len,i,j+3);
      //only relevant since others already used in current box
      nRow = nRow.filter(el=> numbers.includes(el));
      const nRowCopy = nRow.splice();
      const col = getCol(arr, numbers.length);
      const nextCols = getCols(numbers, arr, len);
      let num = j > 2 ? sampleNext(numbers, nRow, nextCols,row) : sample(numbers);
      while (row.includes(num) || col.includes(num)) {
        //3 fixes to sample next when applicable and to always push back into numbers and last to make a nRow copy for reference
        numbers.push(num);
        if (nRowCopy.includes(num)) nRow.push(num);
        num = j > 2 ? sampleNext(numbers, nRow, nextCols,row) : sample(numbers);
      }
      arr.push([num, true]);
    }
  }
  return arr;
}

let result = makeSquares();
console.log(result);

console.log('box 1:')
console.log(JSON.stringify(arr.map(el=>el[0]).slice(0,3)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3,6)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(6,9)));
console.log('box 2:')
console.log(JSON.stringify(arr.map(el=>el[0]).slice(9,12)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(12,15)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(15,18)));
console.log('box 3:')
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*6,3*7)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*7,3*8)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*8,3*9)));
console.log('box 4:')
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*9,3*10)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*10,3*11)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*11,3*12)));
console.log('box 5:')
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*12,3*13)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*13,3*14)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*14,3*15)));
console.log('box 6:')
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*15,3*16)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*16,3*17)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*17,3*18)));
console.log('box 7:')
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*18,3*19)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*19,3*20)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*20,3*21)));
console.log('box 8:')
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*21,3*22)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*22,3*23)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*23,3*24)));
console.log('box 9:')
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*24,3*25)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*25,3*26)));
console.log(JSON.stringify(arr.map(el=>el[0]).slice(3*26,3*27)));

console.log('row 1:')
console.log(arr.map(el => el[0]).slice(3*0, 3*1)
.concat(arr.map(el => el[0]).slice(3*3, 3*4))
.concat(arr.map(el => el[0]).slice(3*6, 3*7)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3, 3*2)
.concat(arr.map(el => el[0]).slice(3*4, 3*5))
.concat(arr.map(el => el[0]).slice(3*7, 3*8)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3*2, 3*3)
.concat(arr.map(el => el[0]).slice(3*5, 3*6))
.concat(arr.map(el => el[0]).slice(3*8, 3*9)).join(" ")
);
console.log('row 4:')
console.log(arr.map(el => el[0]).slice(3*9, 3*10)
  .concat(arr.map(el => el[0]).slice(3*12, 3*13))
  .concat(arr.map(el => el[0]).slice(3*15, 3*16)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3*10, 3*11)
  .concat(arr.map(el => el[0]).slice(3*13, 3*14))
  .concat(arr.map(el => el[0]).slice(3*16, 3*17)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3*11, 3*12)
  .concat(arr.map(el => el[0]).slice(3*14, 3*15))
  .concat(arr.map(el => el[0]).slice(3*17, 3*18)).join(" ")
);
console.log('row 7:');
console.log(arr.map(el => el[0]).slice(3*18, 3*19)
  .concat(arr.map(el => el[0]).slice(3*21, 3*22))
  .concat(arr.map(el => el[0]).slice(3*24, 3*25)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3*19, 3*20)
  .concat(arr.map(el => el[0]).slice(3*22, 3*23))
  .concat(arr.map(el => el[0]).slice(3*25, 3*26)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3*20, 3*21)
  .concat(arr.map(el => el[0]).slice(3*23, 3*24))
  .concat(arr.map(el => el[0]).slice(3*26, 3*27)).join(" ")
);