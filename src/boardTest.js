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
  const nLen = numbers.length;
  const firstCol = [9,6,3];
  const secondCol = [8,5,2];
  const thirdCol = [7,4,1];

  if (firstCol.includes(nLen) || secondCol.includes(nLen)) nextCols = getCol(arr, numbers.length, 1);
  if (firstCol.includes(nLen)) nextCols = nextCols.concat(getCol(arr, numbers.length, 2));

  if (numbers.length > 0) {
    if (thirdCol.includes(nLen)) nextCols = nextCols.concat(getCol(arr, numbers.length, -1));
    if (thirdCol.includes(nLen)) nextCols = nextCols.concat(getCol(arr, numbers.length, -2)); //flag
  }

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
  const valid = nextCols.filter(el=> numbers.includes(el) && !row.includes(el));

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
  if (arr.length < 27) return [];
  let ret = [];
  const maxLen = arr.length < 54 ? 3 : 6;
  let prevBoxCols = 21;  //diff between curr row and last row of prev box
  //2nd row within box so need to subtract 3 to line up with prev box cols
  if (len < 7) prevBoxCols += 3; 
  if (len < 4) prevBoxCols += 3;

  const start = arr.length + offset - prevBoxCols;
  for (let x = start; x >= 0; x -= 3) { 
    if (ret.length === 3) x -= 18; 
    ret.push(arr[x][0]) 
    if (ret.length === maxLen) break;
  };
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
      // if (arr.length === 29) debugger;
      if (j % 3 === 0) row = getRow(arr, len, i, j);
      if (j === 3) nRow = getRow(arr,len,i,j+3);
      //only relevant since others already used in current box
      nRow = nRow.filter(el=> numbers.includes(el));
      const nRowCopy = nRow.splice();
      const col = getCol(arr, numbers.length);
      const nextCols = getCols(numbers, arr, len);
      let num = j > 1 ? sampleNext(numbers, nRow, nextCols,row) : sample(numbers); //flag
      // let num = sampleNext(numbers, nRow, nextCols,row);
      while (row.includes(num) || col.includes(num)) {
        numbers.push(num);
        if (nRowCopy.includes(num)) nRow.push(num);
        num = j > 1 ? sampleNext(numbers, nRow, nextCols,row) : sample(numbers); //flag
      }
      arr.push([num, true]);
    }
  }
  return arr;
}

let result = makeSquares();
console.log(result);

console.log(arr.map(el => el[0]).slice(3*0, 3*1).concat(" ")
.concat(arr.map(el => el[0]).slice(3*3, 3*4)).concat(" ")
.concat(arr.map(el => el[0]).slice(3*6, 3*7)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3, 3*2).concat(" ")
.concat(arr.map(el => el[0]).slice(3*4, 3*5)).concat(" ")
.concat(arr.map(el => el[0]).slice(3*7, 3*8)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3*2, 3*3).concat(" ")
.concat(arr.map(el => el[0]).slice(3*5, 3*6)).concat(" ")
.concat(arr.map(el => el[0]).slice(3*8, 3*9)).join(" ")
);
console.log('')
console.log(arr.map(el => el[0]).slice(3*9, 3*10).concat(" ")
  .concat(arr.map(el => el[0]).slice(3*12, 3*13)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3*15, 3*16)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3*10, 3*11).concat(" ")
  .concat(arr.map(el => el[0]).slice(3*13, 3*14)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3*16, 3*17)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3*11, 3*12).concat(" ")
  .concat(arr.map(el => el[0]).slice(3*14, 3*15)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3*17, 3*18)).join(" ")
);
console.log('');
console.log(arr.map(el => el[0]).slice(3*18, 3*19).concat(" ")
  .concat(arr.map(el => el[0]).slice(3*21, 3*22)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3*24, 3*25)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3*19, 3*20).concat(" ")
  .concat(arr.map(el => el[0]).slice(3*22, 3*23)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3*25, 3*26)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3*20, 3*21).concat(" ")
  .concat(arr.map(el => el[0]).slice(3*23, 3*24)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3*26, 3*27)).join(" ")
);