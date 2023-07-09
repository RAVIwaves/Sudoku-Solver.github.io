function b(i, j) {
  return Math.floor(i / 3) * 3 + Math.floor(j / 3);
}

function solve(row, column, box, blank, i, sudoku, sizi) {
  if (i === sizi) return true;
  const rr = Math.floor(blank[i] / 10);
  const cc = blank[i] % 10;
  const bb = b(Math.floor(blank[i] / 10), blank[i] % 10);

  for (let j = 1; j <= 9; j++) {
    if (!row[rr][j - 1] && !column[cc][j - 1] && !box[bb][j - 1]) {
      row[rr][j - 1] = true;
      column[cc][j - 1] = true;
      box[bb][j - 1] = true;

      const c = solve(row, column, box, blank, i + 1, sudoku, sizi);
      if (c) {
        sudoku[rr][cc] = j;
        return true;
      }

      row[rr][j - 1] = false;
      column[cc][j - 1] = false;
      box[bb][j - 1] = false;
    }
  }

  return false;
}

function solveSudokuF(sudoku) {
  const row = Array.from({ length: 9 }, () => Array(9).fill(false));
  const column = Array.from({ length: 9 }, () => Array(9).fill(false));
  const box = Array.from({ length: 9 }, () => Array(9).fill(false));
  const blank = [];
  let sizi = 0;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      row[i][j] = false;
      column[i][j] = false;
      box[i][j] = false;
    }
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === 0) {
        blank.push(i * 10 + j);
        sizi++;
      } else {
        const t = sudoku[i][j] - 1;
        if (row[i][t] || column[j][t] || box[b(i, j)][t]) {
          return false;
        }
        row[i][t] = true;
        column[j][t] = true;
        box[b(i, j)][t] = true;
      }
    }
  }

  return solve(row, column, box, blank, 0, sudoku, sizi);
}

function solveSudoku() {
  const sudoku = [];
  let rows = document.getElementsByTagName("tr");
  for (let i = 0; i < 9; i++) {
    let cells = rows[i].getElementsByTagName("input");
    sudoku[i] = [];
    for (let j = 0; j < 9; j++) {
      sudoku[i][j] = parseInt(cells[j].value) || 0;
    }
  }
  var ans = solveSudokuF(sudoku);
  if (ans === true) {
    alert("Sudoku Solved") ;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        var idd = ("rc"+i)+j ;
        console.log(idd) ;
        var inputElement = document.getElementById(idd);
        inputElement.value = sudoku[i][j] ;
      }
    }
  }
  else {
    alert("Invalid Sudoku");
  }
  return;
}