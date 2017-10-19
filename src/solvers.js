/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

var factorial = function(n) {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
};

window.findNRooksSolution = function(n) {
  var solution = makeEmptyMatrix(n); //fixme
  //creates a new board
  //the loop is sort of a boilerplate;
  for (var i = 0; i < n; i++) {
    solution[i][i] = 1;
  }
  
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = factorial(n); //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = makeEmptyMatrix(n);
  var board = new Board({n: n});
  var solved = false;
  
  console.log(board.rows());
  var placeQueen = function(index = 0) {
    if (index === n) { 
      return true; 
    }
    
    var row = board.get(index);
    
    for (var i = 0; i < n; i++) {

      board.togglePiece(index, i);
      
      if (!board.hasAnyQueensConflicts()) {
        solved = placeQueen(index + 1);
      } else {
        board.togglePiece(index, i);
      }
      
      if (solved) {
        return true;
      }
      
    }
  
    return false;
  };
  
  solved = placeQueen();
  //can't find a way to access array, so a loop is called to transfer everything in board to solution;
  for (let i = 0; i < n; i++) {
    solution[i] = board.get(i);
  }
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
