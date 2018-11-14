'use strict';

var path = require('./astar/astar.js');

let maze = [
		   [1,1,0,1,1,1,1,1,1],
		   [1,1,1,1,1,0,1,1,1],
		   [1,1,0,1,1,0,1,1,1],
		   [0,0,0,0,0,0,1,0,1],
		   [1,1,1,1,1,1,1,1,1],
		   [1,1,1,0,1,0,1,1,1],
		   [1,1,1,1,1,1,1,1,1],
		   [1,1,1,1,1,1,1,1,1],		   
		   ];

let dist = 3;
let x = 0;
let y = 0;

let runSearch = function (graph, start, end, options) {
  if (!(graph instanceof path.Graph)) {
    graph = new path.Graph(graph);
  }
  start = graph.grid[start[0]][start[1]];
  end = graph.grid[end[0]][end[1]];
  var sTime = new Date(),
    result = path.astar.search(graph, start, end, options),
    eTime = new Date();
  return {
    result: result,
    text: pathToString(result),
    time: (eTime - sTime)
  };
}
let pathToString = function (result) {
  return result.map(function(node) {
    return "(" + node.x + "," + node.y + ")";
  }).join("");
}
var res = runSearch(maze, [0,0], [5,5]);

//console.log(avalTile.findTiles(maze, x, y, dist));
console.log(res.text);






