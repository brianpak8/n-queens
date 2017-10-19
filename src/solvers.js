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
  var solution = undefined; //fixme
  //declare a flag that would indicate a solution being found
  var flag = false;
  //initialize a new board
  var board = new Board({n: n});
  //closure function that uses the index
  var placeRook = function(index = 0) {
    if (index === n) {
      flag = true;
      return;
    }
    for (let i = 0; i < n; i++) {
      board.togglePiece(index, i);
      if (!board.hasAnyRooksConflicts()) {
        placeRook(index + 1);
      }
      if (flag === true) {
        return;
      }
      board.togglePiece(index, i);
    }
  };
  
  
  //inside closure:
  //base case (think about making the flag true)
  //loop + recursion (think about toggle and checking for any conflicts)
  
  placeRook();
  solution = board.rows();
  
  
  
  //have solution reference the board's arrays (hint hint board.rows())
  
  
  
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
      solved = true;
      return; 
    }
    
    for (var i = 0; i < n; i++) {

      board.togglePiece(index, i);
      
      if (!board.hasAnyQueensConflicts()) {
        placeQueen(index + 1);
      } 
      
      if (solved) {
        return;
      }
      
      board.togglePiece(index, i);
      
    }
  };
  placeQueen();
  //can't find a way to access array, so a loop is called to transfer everything in board to solution;
  solution = board.rows();
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  
  var placeQueen = function(index = 0) {
    if (index === n) {
      solutionCount++;
      return;
    }
    
    for (var i = 0; i < n; i++) {
      board.togglePiece(index, i);
      
      if (!board.hasAnyQueensConflicts()) {
        placeQueen(index + 1);
      }
      
      board.togglePiece(index, i);
    }
  };
  
  placeQueen();
  
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};











