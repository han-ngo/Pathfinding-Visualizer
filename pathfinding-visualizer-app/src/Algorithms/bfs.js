export function bfs(grid, start, target) {

  // Queue - tracking path tracing back to node
  let track = [{
    [start.row + ' ' + start.col]: []
  }];

  // Breadth First Search
  while (track.length !== 0) {
    // explore next node in queue
    const curTrace = track.shift(); // pop Queue
    const curNode = getNodeById(grid, Object.keys(curTrace)[0]);
    const curNodeId = curNode.row + ' ' + curNode.col;
    const pathToCurNode = [].concat(curTrace[curNodeId]);

    // return path if curNode is target
    if (curNode === target) {
      console.log("found target at node " + curNode.row + " " + curNode.col);
      return pathToCurNode;
    }

    // explore current node if not visited yet
    if (!curNode.isVisited) {
      // add unvisited neighbors to Queue
      const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid);
      // mark current node as visited and add path
      curNode.isVisited = true;
      pathToCurNode.push(curNode);
      // add unvisited neighbor & its path to Queue
      for (let unvistedNeighbor of unvisitedNeighbors) {
          const unvistedNeighborId = unvistedNeighbor.row + ' ' + unvistedNeighbor.col;
          track.push({[unvistedNeighborId]: pathToCurNode});
      }
    }
  }

}

function getNodeById(grid, curNodeId) {
  const curNodeRowCol = curNodeId.split(' ');
  const curNode = grid[curNodeRowCol[0]][curNodeRowCol[1]];
  return curNode;
}

function getUnvisitedNeighbors(node, grid) {
  let neighbors = [];
  const {row, col} = node;
  if (row > 0) neighbors.push(grid[row-1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row+1][col]);
  if (col > 0) neighbors.push(grid[row][col-1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col+1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

