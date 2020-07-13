function randIdx(arr) {
  return Math.floor(Math.random() * arr.length);
}

function validNumbers(arr) {
  return [1,2,3,4,5,6,7,8,9].filter(num => !arr.includes(num));
}

function sample(arr, numbers, nTried, row, numbsUsed) {
  const copy = numbers.slice().filter(el => !nTried.includes(el) && chkPos(arr, arr.length, el));
  const idx = randIdx(copy);
  let num = copy.splice(idx,1)[0];
  if (!num) num = randNum(numbers);
  if (num === undefined) numbers = validNumbers(numbsUsed);
  let nIdx = numbers.indexOf(num);
  if (nIdx === -1) nIdx = randIdx(numbers);
  numbers.splice(nIdx,1);
  nTried.push(num);

  return num;
}

function legalNum(arr, numbers, nTried) {
  const copy = JSON.parse(JSON.stringify(arr));
  for (let z=0; z<numbers.length;z++) {
    copy.push([numbers[z],true]);
    if (legalPos(copy, copy.length-1, false)) return getNumber(numbers, numbers[z], nTried);
    copy.pop();
  }
  let rand = randNum(numbers);
  return getNumber(numbers, rand, nTried);
}

function getCols(numbers, arr) {
  let nextCols = [];
  const nLen = numbers.length;
  const cols = [[9, 6, 3], [8, 5, 2], [7, 4, 1]];

  if (cols[0].includes(nLen) || cols[1].includes(nLen)) nextCols = getCol(arr, numbers.length, 1);
  if (cols[0].includes(nLen)) nextCols = nextCols.concat(getCol(arr, numbers.length, 2));

  if (numbers.length > 0) {
    if (cols[2].includes(nLen)) nextCols = nextCols.concat(getCol(arr, numbers.length, -1));
    if (cols[2].includes(nLen)) nextCols = nextCols.concat(getCol(arr, numbers.length, -2)); //flag
  }

  return nextCols;
}

function common(arr1,arr2) {
  let arr = [];
  for (let z=0;z<arr1.length;z++) { if (arr2.includes(arr1[z])) arr.push(arr1[z]) };
  return arr;
}

// function chkValid(arr, numbers, n) {
//   const number = numbers[n-1];
//   const vert = getCol(arr, numbers.length, n);
//   const horiz = getRow(arr);

//   return !vert.includes(number) && !horiz.includes(number);
// }

function getNumber(numbers, n, nTried) {
  nTried.push(n);
  const numbIdx = numbers.indexOf(n);
  return numbers.splice(numbIdx, 1)[0];
}

function sampleNext(arr, numbers, nRow, nextCols, row, nTried, numbsUsed){
  const valid = nextCols.filter(el=> numbers.includes(el) && !row.includes(el));
  if (nRow.length || valid.length) {
    let el, idx;
    if (nRow.length) {
        idx = randIdx(nRow);
        el = nRow.splice(idx,1)[0];
    } else {
      el = valid[randIdx(valid)];
    }
    return getNumber(numbers, el, nTried);
  } else {
    return sample(arr, numbers, nTried, row, numbsUsed);
  }
}

// function getStop(i){
//   if (i < 3) return 0;
//   return i < 6 ? 27 : 54;
// }

function getRow(arr, offset=0) {
  let line = rowByIdx(arr.length+offset);
  return line.filter(el => arr[el]).map(idx => arr[idx][0]);
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

function getNRow(numbers, arr) {
  let nRow = getRow(arr, 3);
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
    4: [69,66,63,42,39,36,15,12,9], 5: [70,67,64,43,40,37,16,13,10], 6: [71,68,65,44,41,38,17,14,11],
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
  return rows[getLine(rows,idx)] || [];
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

function legalPos(arr, idx, box=true) {
  const row2 = rowByIdx(idx);
  const col2 = colByIdx(idx);
  if (!lineValid(arr, row2) || !lineValid(arr, col2)) return false;
  if (box && !boxValid(arr, idx) === true) return false;

  return true;
}

function chkSwap(arr, pos1,pos2) {
  const copy = JSON.parse(JSON.stringify(arr));
  makeSwap(copy, pos1,pos2);

  return legalPos(copy, pos2) && legalPos(copy, pos1);
}

function chkPos(arr, pos, num, box=true) {
  let copy = JSON.parse(JSON.stringify(arr));
  copy[pos] = [num,true];

  return legalPos(copy, pos, box);
}

function makeSwap(arr,pos1,pos2) {
  let temp = arr[pos1].slice();
  arr[pos1] = arr[pos2].slice();
  arr[pos2] = temp;
}

function findNum(arr, num, idx){
  let indices = [];
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

function boxValid(arr, idx) {
  let count = {};
  const start = idx - idx % 9;

  for (let z = start; z < start + 9; z++) {
    if (!arr[z]) return true;
    if (count[arr[z][0]] === 1) return false;

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

// function elementsByIdx(arr, indices) {
//   let ret = [];
//   for (let m=0;m<indices.length;m++) {
//     if (arr[indices[m]]) ret.push(arr[indices[m]][0]);
//   }
//   return ret;
// }

function findSwap(arr, row, num, swapped, adjCol=0) {
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
      const swap = chkSwap(arr, indices[z], indices[z] + idxs[y]);
      if (swap) {
        makeSwap(arr, indices[z], indices[z]+idxs[y]);
        swapped = true;
        return row.includes(num) ? [num2, swapped] : [num, swapped];
      }
    }
  }
  return null;
}

// function cellNumbers(numbers, row) {
//   let ret = [];
//   for (let z=0;z<numbers.length;z++) {
//     if (!row.includes(numbers[z])) ret.push(numbers[z]);
//   }
//   return ret;
// }

function removeIfEl(arr, el) {
  if (arr.includes(el)) arr.splice(arr.indexOf(el), 1);
}

function lastX(nTried, num) {
  let target = nTried[nTried.length -1];
  for (let x=1;x<=num;x++) {
    if (nTried[nTried.length-x] !== target) return false;
  }
  return true;
}

function getSwap(arr, row, num, swapped, nTried) {
  const cage = Math.floor(arr.length / 9);
  let adj = (lastX(nTried, 4) && Math.random() > .5) ? -9 : 0;

  if (adj && (cage === 5 || cage === 8) && Math.random() > .5) adj -= 9;
  return findSwap(arr, row, num, swapped, adj);
}

function getFound(nTried, found, swapped) {
  if (found) {
    nTried.splice(nTried.indexOf(found[0]), 1);
    return swapped === found[0] ? false : found[0];
  }
}

function retryX(arr, numbers, nTried, num) {
  const copy = num;
  num = legalNum(arr, numbers, nTried, num);
  if (copy !== num) numbers.push(copy);
  return num;
}

function retryCage(arr, row, col, numbers, num, nTried, swapped = false, nRow, nRowCopy, nextCols, i, j, numbsUsed) {
  while (row.includes(num) || col.includes(num)) {
    nTried.push(num);
    if (!swapped) numbers.push(num);
    if (nRowCopy.includes(num)) nRow.push(num);
    let found, next;

    if (nTried.length + j > 8 || common(nRow, nTried).length === nRow.length) {
      if (lastX(nTried, 10)) num = retryX(arr, numbers, nTried, num) || num;
      if (!swapped && !next) found = getSwap(arr, row, num, swapped, nTried);

      swapped = getFound(nTried, found, swapped);
      let mod = numbers.includes(num) ? 0 : 1;
      col = getCol(arr, numbers.length + mod);
    }
    row = getRow(arr);
    if (!swapped && !next) num = sampleNext(arr, numbers, nRow, nextCols, row, nTried, numbsUsed);
    next = false;
  }
  return num;
}

function buildCage(arr, len, numbers, i, revealNum) {
  let numbsUsed = [];
  for (let j = 0; j < len ** 2; j++) {
    numbers = validNumbers(numbsUsed);
    let row = getRow(arr);
    let nRow = j === 3 ? getNRow(numbers, arr) : [];

    const nRowCopy = nRow.slice();
    let col = getCol(arr, numbers.length);
    const nextCols = getCols(numbers, arr, len);

    let nTried = tried(numbers, row, col);
    let num = sampleNext(arr, numbers, nRow, nextCols, row, nTried, i, j);
    if (row.includes(num) || col.includes(num)) num = retryCage(arr, row, col, numbers, num, nTried, false, nRow, nRowCopy, nextCols, i, j, numbsUsed);
    if (num === undefined) break;
    removeIfEl(numbers, num);
    numbsUsed.push(num);
    let bool = Math.random() > revealNum / 100;
    // let bool = Math.random() > revealNum;
    arr.push([num, bool]);
  }
}

function buildBoard(len = 3, revealNum = 50) {
  let arr = [];
  for (let i = 0; i < len ** 2; i++) {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    buildCage(arr, len, numbers, i, revealNum);
  }
  return arr;
}

// let result = buildBoard();

// while (result.length !== 81) {
//   result = buildBoard();
// }

// console.log('');
// console.log(result.map(el => el[0]).slice(3*0, 3*1).concat(" ")
// .concat(result.map(el => el[0]).slice(3*3, 3*4)).concat(" ")
// .concat(result.map(el => el[0]).slice(3*6, 3*7)).join(" ")
// );
// console.log(result.map(el => el[0]).slice(3, 3*2).concat(" ")
// .concat(result.map(el => el[0]).slice(3*4, 3*5)).concat(" ")
// .concat(result.map(el => el[0]).slice(3*7, 3*8)).join(" ")
// );
// console.log(result.map(el => el[0]).slice(3*2, 3*3).concat(" ")
// .concat(result.map(el => el[0]).slice(3*5, 3*6)).concat(" ")
// .concat(result.map(el => el[0]).slice(3*8, 3*9)).join(" ")
// );
// console.log('');
// console.log(result.map(el => el[0]).slice(3*9, 3*10).concat(" ")
//   .concat(result.map(el => el[0]).slice(3*12, 3*13)).concat(" ")
//   .concat(result.map(el => el[0]).slice(3*15, 3*16)).join(" ")
// );
// console.log(result.map(el => el[0]).slice(3*10, 3*11).concat(" ")
//   .concat(result.map(el => el[0]).slice(3*13, 3*14)).concat(" ")
//   .concat(result.map(el => el[0]).slice(3*16, 3*17)).join(" ")
// );
// console.log(result.map(el => el[0]).slice(3*11, 3*12).concat(" ")
//   .concat(result.map(el => el[0]).slice(3*14, 3*15)).concat(" ")
//   .concat(result.map(el => el[0]).slice(3*17, 3*18)).join(" ")
// );
// console.log('');
// console.log(result.map(el => el[0]).slice(3*18, 3*19).concat(" ")
//   .concat(result.map(el => el[0]).slice(3*21, 3*22)).concat(" ")
//   .concat(result.map(el => el[0]).slice(3*24, 3*25)).join(" ")
// );
// console.log(result.map(el => el[0]).slice(3*19, 3*20).concat(" ")
//   .concat(result.map(el => el[0]).slice(3*22, 3*23)).concat(" ")
//   .concat(result.map(el => el[0]).slice(3*25, 3*26)).join(" ")
// );
// console.log(result.map(el => el[0]).slice(3*20, 3*21).concat(" ")
//   .concat(result.map(el => el[0]).slice(3*23, 3*24)).concat(" ")
//   .concat(result.map(el => el[0]).slice(3*26, 3*27)).join(" ")
// );

export {buildBoard};