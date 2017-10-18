// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //acquire the row using rowIndex
      var row = this.get(rowIndex);
      //try to isolate all of the pieces of there are any (hint: hofs are bae)
      var countPieces = row.filter(square => square === 1);
      //if there are more than one rook/queen in the row then return true
      return countPieces.length > 1;
      //anything else is fake news 
      //no edge cases (rows are already made and rowindex is auto-generated)

    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //get the size of the board (this will be your constraint when iteration through it)
      var size = this.get('n');
      //iterate through the board and use the previously written helper function
      for (var i = 0; i < size; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      //you will use indexes 0 to (n - 1) to iterate through the rows
      //any instance of a true being returned means there is a conflict so return true
      //finishing the loop is grounds for this function being fake news
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //get boardsize
      var n = this.get('n');
      //declare the array you will push your col variables to
      var columnPieces = [];
      //make a loop that iterates through all the column elements (hint: try this.get(rowIndex)[colIndex])
      for (var i = 0; i < n; i++) {
        if (this.get(i)[colIndex] === 1) {
          columnPieces.push(1);
        }
      }
      //only iterate through rows (keep colIndex the same)
      //push elements to new array
      //use new array like it's a row to isolate the pieces
      return columnPieces.length > 1;
      //use conditional to evaluate the length with respect to the conditions for a conflict
    
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //literally the same as the row counterpart, but with namechange
      var size = this.get('n');
      for (var i = 0; i < size; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //the usual: board size and diag array
      var n = this.get('n');
      var diagonal = [];
      //feel free to rename this arbitrarily long name 
      var col = majorDiagonalColumnIndexAtFirstRow;
      //use a loop like it's col, but this time instead of arr[i][i] iteration it's arr[i][i + colIndex]
      for (var i = 0; i < n; i++) {
        diagonal.push(this.get(i)[i + col]);
      }
      //same concepts in pushing element like in col
      diagonal = diagonal.filter(element => element === 1);
      //evaluate it, you got this
      return diagonal.length > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //same copypasta as relevant functions, but with a twist!!!
      var n = this.get('n');
      for (var i = -n + 1; i < n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      //think about how to address the elements at the lower left
      //aka try to think about why earlier we saw in the console [undef, undef, undef, 0]
      //one small tweak homie 
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //very very similar to the major counterpart, but it decrements instead
      //gl;hf
      var diagonal = [];
      var n = this.get('n');
      var col = minorDiagonalColumnIndexAtFirstRow;
      for (var i = 0; i < n; i++) {
        diagonal.push(this.get(i)[col - i]);
      } 
      diagonal = diagonal.filter(element => element === 1);
      return diagonal.length > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //exactly the opposite of its major counterpart (especially the decrementing)
      //its lit fam
      var n = this.get('n');
      for (var i = 2 * n - 1; i >= 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
