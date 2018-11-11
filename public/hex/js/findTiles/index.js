'use strict';
(function(){
	function pad(str, length, symb) {
		let my_string = str;
		while (my_string.length < length) {
        my_string = symb + my_string;
		}
		return my_string;
	}

	function dec2binArr(dec, size) {
		let str = pad(dec2bin(dec), size, '0');	
		let ar = new Array();
		for(let i = 0; i < str.length; i++) {
			ar.push(+str.charAt(i));		
		}	 			
		return ar;
	}

	function bin2decArr(bin) {
		let text = '';
		bin.forEach(function(el) {
			text += el;
		});
		return bin2dec(text);
	}

	function dec2bin(dec) {
		return (dec >>> 0).toString(2);
	}

	function bin2dec(bin) {
		return parseInt(bin, 2).toString(10);
	}

	function openAllLines(res, _maze) {
		for(let i=0; i<_maze.length; i++){
			res[i] = openLine(res[i], _maze.length, _maze[i]);
		}
		return res;
	}
		
	function openLine(line, size, mazeLine) {		
		let resetFirstBit = bin2dec('0' + pad('', size, '1'));
		for (let i = 0; i < size; i++) { 
			let line1 = (line << 1) & resetFirstBit; 				
			let line2 = line >> 1;			
			line = (line | line1);
			line = (line | line2);	
			line = line & mazeLine;		
		}			
		return line;	
	}

	function createEmpty(size){
		let res = new Array();	
		for(let i=0; i<size; i++){
			let arr2 = new Array(size).fill(0);;				
			res.push(arr2);
		}	
		return res;	
	}

	function compareArrays(array1, array2) {
		// if the other array is a falsy value, return
		if (!array1)
			return false;
		if (!array2)
			return false;

		// compare lengths - can save a lot of time 
		if (array1.length != array2.length) return false;

		for (var i = 0, l=array1.length; i < l; i++) {               
			if (array1[i] != array2[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
			}           
		}       
		return true;
	}

    let findTiles = function(maze, x, y, dist) {
        let _maze = maze.slice(0);
        for (let i = 0; i < maze.length; i++) {
            let node = null;
            for (let j = 0; j < maze[i].length; j++) {
                if ( Math.abs(i - x) > dist || Math.abs(j - y) > dist ) {
                    _maze[i][j] = 0;
                }
            }
        }

        let res = createEmpty(maze.length);
        res[y][x] = 1;

        for (let i = 0; i < maze.length; i++) {
            _maze[i] = +bin2decArr(maze[i]);
            res[i] = +bin2decArr(res[i]);
        };

        let resCopy = null;
        let iter = 0;

        while(compareArrays(res, resCopy)==false && (iter < _maze.length*_maze.length)) {

            iter ++;
            resCopy = res.slice(0);

            for (let i = 0; i < maze.length - 1; i++) {
                res[i] = res[i + 1] = res[i] | res[i+1];
                res[i] = res[i] & _maze[i];
                res[i+1] = res[i + 1] & _maze[i+1];
            }
            res = openAllLines(res, _maze);
        }
        for (let i = 0; i < maze.length ; i++) {
            res[i] = dec2binArr(res[i], maze.length);
        }
        return res;
    }

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = findTiles;
    else
        window.findTiles = findTiles;
})();

