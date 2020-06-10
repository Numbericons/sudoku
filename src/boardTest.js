function randIdx(arr) {
  return Math.floor(Math.random() * arr.length);
}

function sample(numbers, nTried) {
  const copy = numbers.slice().filter(el => !nTried.includes(el))
  const idx = randIdx(copy);
  const num = copy.splice(idx,1)[0];
  const nIdx = numbers.indexOf(num);
  numbers.splice(nIdx,1)[0];
  if (!nTried.includes(num)) nTried.push(num);

  return num;
}

function getCols(numbers, arr) {
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
  let arr = [];
  for (let z=0;z<cols.length;z++) { if (row.includes(cols[z])) arr.push(cols[z]) };
  return false;
}

function chkValid(arr, numbers, n, i, j) {
  // const idx = arr.length - 1 + n;
  debugger;
  const number = numbers[n-1];
  const col = getCol(arr, numbers.length, n);
  const row = getRow(arr, numbers.length, i, j+1);

  return !col.includes(number) && !row.includes(number);
}
// need to get row and columns for both elements

//arr length should be a max of 2 since it is sourcing from 2 columns
function getPriority(numbers, nextRow, arr, i, j) {
  debugger;
  if (arr.length === 1) return splPriority(numbers, nextRow, arr[0]);
  const validNext = chkValid(arr, numbers, 1, i, j);
  const validNext2 = chkValid(arr, numbers, 2, i, j);
  if (validNext && validNext2) {
    return Math.random > .5 ? splPriority(numbers, nextRow, arr[0]) : splPriority(numbers, nextRow, arr[1]);
  } else if (validNext) {
    return splPriority(numbers, nextRow, arr[0]);
  } else {
    return splPriority(numbers, nextRow, arr[1]);
  }
}

function splPriority(numbers,nextRow,el){
  const numbIdx = numbers.indexOf(el);
  numbers.splice(numbIdx,1);
  const rowIdx = nextRow.indexOf(el);

  return nextRow.splice(rowIdx,1)[0];
}

function sampleNext(numbers, nRow, nextCols, row, nTried, i, j){
  const priority = common(nextCols, nRow);
  if (priority) return getPriority(numbers, nRow, priority, i, j);
  const valid = nextCols.filter(el=> numbers.includes(el) && !row.includes(el));

  if (nRow.length || valid.length) {
    let el;
    if (nRow.length) {
      let idx = randIdx(nRow);
      el = nRow.splice(idx,1)[0];
    } else {
      el = valid[randIdx(valid)];
    }
    if (!nTried.includes(el)) nTried.push(el);
    const numbIdx = numbers.indexOf(el);
    return numbers.splice(numbIdx, 1)[0];
  } else {
    return sample(numbers, nTried);
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
//j might be 8 for most possible
//i will be the row from the pos we are checking
function getRow(arr, len, i, j) {
  if (arr.length === 46) debugger;
  if (!arr.length) return arr;
  let ret = [];
  const start = (len**2 * i) - 9 + j;
  const stop = getStop(i);
  for (let x = start; x >= stop; x -= 9) {
    for (let z=0;z<3;z++) { ret.push(arr[x+z][0]) } 
  };
  return ret;
}

function getCol(arr, len, offset=0, max=null, num=null) {
  if (arr.length < 27) return [];
  let ret = [];
  let maxLen = max ? max : arr.length < 54 ? 3 : 6;
  let prevBoxCols = 21;  //diff between curr row and last row of prev box
  //2nd row within box so need to subtract 3 to line up with prev box cols
  if (len < 7) prevBoxCols += 3; 
  if (len < 4) prevBoxCols += 3;

  const start = arr.length + offset - prevBoxCols;
  for (let x = start; x >= 0; x -= 3) { 
    if (ret.length === 3 || ret.length === 6) x -= 18; //jumping to next box
    if (num === arr[x][0]) return arr[x][0];
    ret.unshift(arr[x][0]); //flag want index?
    if (ret.length === maxLen) break;
  };
  return ret;
}

function getNRow(numbers, arr, len, i, j) {
  if (numbers.length < 4 || numbers.length > 6) return [];
  let nRow = getRow(arr, len, i, j + 3);
  // if (j === 3) nRow = getRow(arr,len,i,j+3);
  return nRow.filter(el => numbers.includes(el)); //flag
}

function getLine(line, idx) {
  const keys = Object.keys(line)
  for (let z=0; z<keys.length;z++) {
    if (line[keys[z]].includes(idx)) return z + 1;
  }
}

function colByIdx(idx) {
  const columns = {
    1: [60,57,54,33,30,27,6,3,0], 2: [61,58,55,34,31,28,7,4,1], 3: [62,59,56,35,32,29,8,5,2],
    4: [69,66,63,42,39,36,15,12,9], 5: [70,67,64,43,40,37,16,13,10], 6: [71,68,65,44,40,38,17,14,11],
    7: [78,75,72,51,48,45,24,21,18], 8: [79,76,73,52,49,46,25,22,19], 9: [80,77,74,53,50,47,26,23,20]
  }
  return columns[getLine(columns,idx)];
}

function rowByIdx(idx) {
  const rows = {
    1: [0,1,2,9,10,11,18,19,20], 2: [3,4,5,12,13,14,21,22,23], 3: [6,7,8,15,16,17,24,25,26],
    4: [27,28,29,36,37,37,44,45,46], 5: [30,31,32,39,40,41,48,49,50], 6: [33,34,35,42,43,44,51,52,53],
    7: [54,55,56,63,64,65,72,73,74], 8: [57,58,59,66,67,68,75,76,77], 9: [60,61,62,69,70,71,78,79,80]
  }
  return rows[getLine(rows,idx)];
}

function chkLine(arr, line, num) {
  for (let z=0;z<line.length;z++) {
    if (arr[line[z]][0] === num) return true;
  }
}

function legalPos(arr, num, idx, len) {
  debugger;
  // const offset = arr.length - 1 - idx;
  // const start = getColStart(idx);
  // if (getRow(arr, len, idx, 9).includes(num)) return false;
  if (boxInclOrRet(arr, num, idx, true) === true) return false;
  
  const row = rowByIdx(idx);
  const col = colByIdx(idx);
  if (chkLine(arr, row, num)) return false;
  if (chkLine(arr, col, num)) return false;
  // if (getCol(arr, 1, arr.length - start + 19, 9, num) === num) return false;

  return true;
}

function chkSwap(pos1,pos2,arr,num,len) {
  return legalPos(arr, num, pos1, len) && legalPos(arr, num, pos2, len);
}

function makeSwap(arr,pos1,pos2) {
  let temp = arr[pos1].slice();
  arr[pos1] = arr[pos2].slice();
  arr[pos2] = temp;
}

function findNum(){}
//getCol? how will it work? Maybe adjust or new version to get elements with their indices?

function boxInclOrRet(arr, num, idx, include) {
  const start = idx - idx % 9;
  let box = [];

  for (let z = start; z < start + 9; z++) {
    if (include && arr[z][0] === num) return true;
    box.push(arr[z])
  }

  return box;
}

function makeSquares(len = 3) {
  let arr = [];
  for (let i = 0; i < len ** 2; i++) {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let row;
    let nRow = [];
    for (let j = 0; j < len ** 2; j++) {
      if (j % 3 === 0) row = getRow(arr, len, i, j);
      nRow = getNRow(numbers, arr, len, i, j);
      //only relevant since others already used in current box
      const nRowCopy = nRow.splice();
      const col = getCol(arr, numbers.length);
      const nextCols = getCols(numbers, arr, len);
      let nTried = []; 
      // let num = j > -1 ? sampleNext(numbers, nRow, nextCols,row, nTried) : sample(numbers, nTried); //flag
      let num = sampleNext(numbers, nRow, nextCols, row, nTried, i, j);
      // let test;
      if (arr.length === 64) legalPos(arr, 4, 4, len);
      while (row.includes(num) || col.includes(num)) {
        numbers.push(num);
        if (nRowCopy.includes(num)) nRow.push(num);
        // num = j > -1 ? sampleNext(numbers, nRow, nextCols, row, nTried) : sample(numbers, nTried); //flag
        num = sampleNext(numbers, nRow, nextCols, row, nTried, i, j);
        //nTried has all numbers taht arnt in col or row, try to swap the element you must have there based on row up col, will always work?
      }
      arr.push([num, true]);
    }
  }
  return arr;
}

let result = makeSquares();
console.log(result);

console.log('');
console.log(result.map(el => el[0]).slice(3*0, 3*1).concat(" ")
.concat(result.map(el => el[0]).slice(3*3, 3*4)).concat(" ")
.concat(result.map(el => el[0]).slice(3*6, 3*7)).join(" ")
);
console.log(result.map(el => el[0]).slice(3, 3*2).concat(" ")
.concat(result.map(el => el[0]).slice(3*4, 3*5)).concat(" ")
.concat(result.map(el => el[0]).slice(3*7, 3*8)).join(" ")
);
console.log(result.map(el => el[0]).slice(3*2, 3*3).concat(" ")
.concat(result.map(el => el[0]).slice(3*5, 3*6)).concat(" ")
.concat(result.map(el => el[0]).slice(3*8, 3*9)).join(" ")
);
console.log('');
console.log(result.map(el => el[0]).slice(3*9, 3*10).concat(" ")
  .concat(result.map(el => el[0]).slice(3*12, 3*13)).concat(" ")
  .concat(result.map(el => el[0]).slice(3*15, 3*16)).join(" ")
);
console.log(result.map(el => el[0]).slice(3*10, 3*11).concat(" ")
  .concat(result.map(el => el[0]).slice(3*13, 3*14)).concat(" ")
  .concat(result.map(el => el[0]).slice(3*16, 3*17)).join(" ")
);
console.log(result.map(el => el[0]).slice(3*11, 3*12).concat(" ")
  .concat(result.map(el => el[0]).slice(3*14, 3*15)).concat(" ")
  .concat(result.map(el => el[0]).slice(3*17, 3*18)).join(" ")
);
console.log('');
console.log(result.map(el => el[0]).slice(3*18, 3*19).concat(" ")
  .concat(result.map(el => el[0]).slice(3*21, 3*22)).concat(" ")
  .concat(result.map(el => el[0]).slice(3*24, 3*25)).join(" ")
);
console.log(result.map(el => el[0]).slice(3*19, 3*20).concat(" ")
  .concat(result.map(el => el[0]).slice(3*22, 3*23)).concat(" ")
  .concat(result.map(el => el[0]).slice(3*25, 3*26)).join(" ")
);
console.log(result.map(el => el[0]).slice(3*20, 3*21).concat(" ")
  .concat(result.map(el => el[0]).slice(3*23, 3*24)).concat(" ")
  .concat(result.map(el => el[0]).slice(3*26, 3*27)).join(" ")
);

console.log('');
console.log(arr.map(el => el[0]).slice(3 * 0, 3 * 1).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 3, 3 * 4)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 6, 3 * 7)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3, 3 * 2).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 4, 3 * 5)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 7, 3 * 8)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3 * 2, 3 * 3).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 5, 3 * 6)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 8, 3 * 9)).join(" ")
);
console.log('');
console.log(arr.map(el => el[0]).slice(3 * 9, 3 * 10).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 12, 3 * 13)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 15, 3 * 16)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3 * 10, 3 * 11).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 13, 3 * 14)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 16, 3 * 17)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3 * 11, 3 * 12).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 14, 3 * 15)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 17, 3 * 18)).join(" ")
);
console.log('');
console.log(arr.map(el => el[0]).slice(3 * 18, 3 * 19).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 21, 3 * 22)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 24, 3 * 25)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3 * 19, 3 * 20).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 22, 3 * 23)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 25, 3 * 26)).join(" ")
);
console.log(arr.map(el => el[0]).slice(3 * 20, 3 * 21).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 23, 3 * 24)).concat(" ")
  .concat(arr.map(el => el[0]).slice(3 * 26, 3 * 27)).join(" ")
);