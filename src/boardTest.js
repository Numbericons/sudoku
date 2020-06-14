function randIdx(arr) {
  return Math.floor(Math.random() * arr.length);
}

function sample(numbers, nTried) {
  const copy = numbers.slice().filter(el => !nTried.includes(el))
  const idx = randIdx(copy);
  let num = copy.splice(idx,1)[0];
  if (!num) num = randNum(numbers);
  if (num === undefined) debugger;
  const nIdx = numbers.indexOf(num);
  numbers.splice(nIdx,1);
  nTried.push(num);
  // if (!nTried.includes(num)) nTried.push(num);

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

function common(arr1,arr2) {
  let arr = [];
  for (let z=0;z<arr1.length;z++) { if (arr2.includes(arr1[z])) arr.push(arr1[z]) };
  return arr;
}

function chkValid(arr, numbers, n, i, j) {
  // const idx = arr.length - 1 + n;
  const number = numbers[n-1];
  const col = getCol(arr, numbers.length, n);
  const row = getRow(arr, numbers.length, i, j+1);

  return !col.includes(number) && !row.includes(number);
}
// need to get row and columns for both elements

//arr length should be a max of 2 since it is sourcing from 2 columns
function getPriority(numbers, nextRow, arr, i, j) {
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
  // const priority = common(nextCols, nRow);
  // if (priority) return getPriority(numbers, nRow, priority, i, j);
  const valid = nextCols.filter(el=> numbers.includes(el) && !row.includes(el));
  if (nRow.length || valid.length) {
    let el, idx;
    if (nRow.length) {
      // if (common(nTried,nRow).length !== nRow.length) {
        idx = randIdx(nRow);
        el = nRow.splice(idx,1)[0];
      // }
    } else {
      el = valid[randIdx(valid)];
    }
    nTried.push(el);
    // if (!nTried.includes(el)) nTried.push(el);
    const numbIdx = numbers.indexOf(el);
    let num = numbers.splice(numbIdx, 1)[0];
    if (num === undefined) debugger;
    return num;
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

function getRow(arr, len, i, j) {
  if (!arr.length) return arr;
  let ret = [];
  const start = (len**2 * i) - 9 + j;
  const stop = getStop(i);
  for (let x = start; x >= stop; x -= 9) {
    let sub = [];
    for (let z=0;z<3;z++) { sub.push(arr[x+z][0]) };
    ret = sub.concat(ret);
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
    4: [27,28,29,36,37,38,45,46,47], 5: [30,31,32,39,40,41,48,49,50], 6: [33,34,35,42,43,44,51,52,53],
    7: [54,55,56,63,64,65,72,73,74], 8: [57,58,59,66,67,68,75,76,77], 9: [60,61,62,69,70,71,78,79,80]
  }
  return rows[getLine(rows,idx)];
}

function lineValid(arr, line) {
  if (!line) return true;
  let count = {};
  for (let z=0;z<line.length;z++) {
    if (!arr[line[z]]) continue;
    if (count[arr[line[z]][0]] === 1) return false;
    count[arr[line[z]][0]] = 1;
  }
  return true;
}

function legalPos(arr, num, idx) {
  const row = rowByIdx(idx);
  const col = colByIdx(idx);
  if (!lineValid(arr, row) || !lineValid(arr, col)) return false;
  if (!boxValid(arr, idx) === true) return false;

  return true;
}

function chkSwap(arr, pos1,pos2,num1,num2) {
  const copy = JSON.parse(JSON.stringify(arr));
  makeSwap(copy, pos1,pos2);
  return legalPos(copy, num1, pos2) && legalPos(copy, num2, pos1);
}

function makeSwap(arr,pos1,pos2) {
  let temp = arr[pos1].slice();
  arr[pos1] = arr[pos2].slice();
  arr[pos2] = temp;
}

function findNum(arr, num, idx){
  let indices = [];
  if (!colByIdx(idx)) debugger;
  let start = colByIdx(idx)[0] - (idx % 3);

  for (let z=start;z<start+3;z++) {
    let col = colByIdx(z);
    for (let y=0; y<col.length;y++) {
      if (!arr[col[y]]) continue;
      if (arr[col[y]][0] === num) indices.push(arr.indexOf(arr[col[y]]));
    }
  }
  return indices;
}
//getCol? how will it work? Maybe adjust or new version to get elements with their indices?

function boxValid(arr, idx) {
  let count = {};
  const start = idx - idx % 9;

  for (let z = start; z < start + 9; z++) { 
    if (!arr[z] || count[arr[z][0]] === 1) return false; 
    count[arr[z][0]] = 1;
  };
  return true;
}

function tried(numbers, row, col) {
  let arr = [];
  numbers.forEach(num => { if (row.includes(num) || col.includes(num)) arr.push(num) });
  return arr;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let k = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[k]] = [arr[k], arr[i]];
  }
  return arr;
}
function adjIndices(idx) {
  const adjPos = idx % 9;
  const pos = idx % 3;
  const rowColAdj = [[1,2], [-1,1], [-1,-2]][pos];
  let arr = [];
  if (adjPos > 5) {
    arr = [-3, -6];
  } else {
    arr = adjPos > 2 ? [-3, 3] : [3, 6];
  }
  for (let z = 0; z < rowColAdj.length;z++) {
    arr.push(rowColAdj[z]+arr[0]);
    arr.push(rowColAdj[z]+arr[1]);
  }
  return shuffle(arr);
}

function getIndices(idx, adj) {
  if (adj) return adjIndices(idx);
  const pos = idx % 3;
  return shuffle([[1,2], [-1,1], [-1,-2]][pos]);
}

function randNum(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

function elementsByIdx(arr, indices) {
  let ret = [];
  for (let m=0;m<indices.length;m++) {
    if (arr[indices[m]]) ret.push(arr[indices[m]][0]);
  }
  return ret;
}

// function keyNum(arr, numbers, nRow) {
//   if (nRow.length) return randNum(nRow);
//   let numbChk = [];
//   // let idx = arr.length % 9 === 0 ? 
//   let row = arr.length % 9 === 0 ? [] : rowByIdx(arr.length-1);
//   row = elementsByIdx(arr,row);
//   for (let z = 0; z < numbers.length;z++) { 
//     if (!row.includes(numbers[z])) numbChk.push(numbers[z]);
//   }
//   // let numbChk = numbers.slice();
//   // for (let z=0; z<row.length;z++) { 
//   //   if (!arr[row[z]]) continue;
//   //   if (numbers.includes(arr[row[z]][0])) {
//   //     let idx = numbChk.indexOf(arr[row[z]][0]);
//   //     numbChk.splice(idx,1);
//   //   }
//   // };
//   return numbChk.length ? randNum(numbChk) : randNum(numbers);
// }

function findSwap(arr, row, num, swapped, adjCol=0) {
  // const num = keyNum(arr, numbers, nRow);
  let indices = findNum(arr, num, arr.length + adjCol);
  let range = arr.length + adjCol -27 >= 0 ? 1 : 0;
  if (adjCol) {
    if (arr.length + adjCol - 54 >= 0) range += 1;
    indices = indices.filter(num => num - (27 * range) >= 0);
  }
  indices = shuffle(indices);
  for (let z=0; z<indices.length; z++) {
    let idxs = getIndices(indices[z], adjCol);
    for (let y=0; y<idxs.length; y++) {
      if (!arr[indices[z] + idxs[y]]) continue;
      let num2 = arr[indices[z] + idxs[y]][0];
      const swap = chkSwap(arr, indices[z], indices[z] + idxs[y], num, num2);
      if (swap) {
        makeSwap(arr, indices[z], indices[z]+idxs[y]);
        swapped = true;
        return row.includes(num) ? [num2, swapped] : [num, swapped];
      }
    }
  }
  return null;
}

function cellNumbers(numbers, row) {
  let ret = [];
  for (let z=0;z<numbers.length;z++) {
    if (!row.includes(numbers[z])) ret.push(numbers[z]);
  }
  return ret;
}

function removeIfEl(arr, el) {
  if (arr.includes(el)) arr.splice(arr.indexOf(el), 1);
}

function lastX(nTried, num) {
  let target = nTried[nTried.length -1];
  for (let x=2;x<=num;x++) {
    if (nTried[nTried.length-x] !== target) return false;
  }
  return true;
  // let len = nTried.length - 1;
  // return nTried[len] === nTried[len - 1] && nTried[len - 1] === nTried[len - 2];
}

function retrySquare(arr, row, col, numbers, num, nTried, swapped, nRow, nRowCopy, nextCols, i, j) {
  while (row.includes(num) || col.includes(num)) {
    nTried.push(num);
    if (!swapped) numbers.push(num);
    if (nRowCopy.includes(num)) nRow.push(num);
    if (nTried.length + j > 8 || common(nRow, nTried).length === nRow.length) {
      let found;
      if (lastX(nTried, 3)) {
        const adj = Math.random() > .5 ? 0 : -9;
        found = findSwap(arr, row, num, swapped, adj);
      } else {
        found = findSwap(arr, row, num, swapped);
      }
      // found = !lastThree(nTried) ? findSwap(arr, row, num, swapped) : findSwap(arr, row, num, swapped, -9);
      if (found) {
        nTried.splice(nTried.indexOf(found[0]), 1);
        swapped = swapped === found[0] ? false : found[0];
      } else {
        swapped = false;
      }
      let mod = numbers.includes(num) ? 0 : 1;
      col = getCol(arr, numbers.length + mod);
    }
    // num = sampleNext(numbers, nRow, nextCols, row, nTried, i, j);
    if (!swapped) num = sampleNext(numbers, nRow, nextCols, row, nTried, i, j);
  }
  return num;
}

function makeRow(arr, len, row, numbers, nRow, i) {
  for (let j = 0; j < len ** 2; j++) {
    if (j % 3 === 0) row = getRow(arr, len, i, j);
    if (j === 3) nRow = getNRow(numbers, arr, len, i, j);
    const nRowCopy = nRow.slice();
    let col = getCol(arr, numbers.length);
    const nextCols = getCols(numbers, arr, len);
    let nTried = tried(numbers, row, col);
    let num = sampleNext(numbers, nRow, nextCols, row, nTried, i, j);
    let swapped = false;
    if (row.includes(num) || col.includes(num)) num = retrySquare(arr, row, col, numbers, num, nTried, swapped, nRow, nRowCopy, nextCols, i, j);

    removeIfEl(numbers, num);
    arr.push([num, true]);
  }
}

function makeSquares(len = 3) {
  let arr = [];
  for (let i = 0; i < len ** 2; i++) {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let row;
    let nRow = [];
    makeRow(arr, len, row, numbers, nRow, i);
    // for (let j = 0; j < len ** 2; j++) {
    //   if (j % 3 === 0) row = getRow(arr, len, i, j);
    //   if (j === 3) nRow = getNRow(numbers, arr, len, i, j);
    //   const nRowCopy = nRow.slice();
    //   let col = getCol(arr, numbers.length);
    //   const nextCols = getCols(numbers, arr, len);
    //   let nTried = tried(numbers, row, col);
    //   let num = sampleNext(numbers, nRow, nextCols, row, nTried, i, j);
    //   let swapped = false;
    //   if (row.includes(num) || col.includes(num)) num = retrySquare(arr, row, col, numbers, num, nTried, swapped, nRow, nRowCopy, nextCols, i, j);
      
    //   removeIfEl(numbers,num);
    //   arr.push([num, true]);
    // }
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