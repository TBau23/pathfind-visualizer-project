// A* Search 
// at each step it picks node according to the value f, which is the sum of two other parameters, g and h
// g = movement cost to move from given square on grid to final destination
// can think of this as the existing distance property
// h = a heuristic cost - good guess at cost of moving from given square on grid to final destination



import { getAllNodes } from './dijsktras';

export function aStar(grid, start, end) {
    const visitedNodesInOrder = []; // closed list
    start.distance = 0; // effectively g cost
    start.f_cost = 0;
    start.h_cost = manhattanHeuristic(start, end)
    const unvisitedNodes = getAllNodes(grid); // open list
    while(unvisitedNodes.length) {
        sortNodesByFCost(unvisitedNodes);
        const lowestFnode = unvisitedNodes.shift();
        if(lowestFnode.wall) continue;
        if(lowestFnode.f_cost === Infinity) return visitedNodesInOrder; // trapped case
        lowestFnode.visited = true;
        visitedNodesInOrder.push(lowestFnode);
        if(lowestFnode === end) return visitedNodesInOrder;
        updateUnvisitedNeighbors(lowestFnode, grid, end);
    };



}

function sortNodesByFCost(nodes) {
    nodes.sort((a,b) => a.f_cost - b.f_cost);
}


function updateUnvisitedNeighbors(currentNode, grid, endNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = currentNode.distance + 1; // g cost
        neighbor.h_cost = manhattanHeuristic(neighbor, endNode);
        neighbor.f_cost = neighbor.h_cost + neighbor.distance
        neighbor.prevNode = currentNode;
    }

}

function manhattanHeuristic(currentNode, endNode) {
    const currentX = currentNode.col;
    const currentY = currentNode.row;
    const endX = endNode.col;
    const endY = endNode.row;

    return Math.abs(currentX - endX) + Math.abs(currentY - endY)

}

// going to implement diagonals with this one - or maybe not ?
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if(row > 0) neighbors.push(grid[row - 1][col]); // above
    if(col < grid[0].length - 1) neighbors.push(grid[row][col + 1]) // to the right
    if(row < grid.length - 1) neighbors.push(grid[row + 1][col]); // below 
    if(col > 0) neighbors.push(grid[row][col - 1]); // to the left
    
    // if(row > 0 && col < grid[0].length - 1) neighbors.push(grid[row - 1][col + 1]) // upper right
    // if(row < grid.length - 1 && col < grid[0].length - 1) neighbors.push(grid[row + 1][col + 1]);
    // if(row < grid.length - 1 && col > 0) neighbors.push(grid[row + 1][col - 1]);
    // if(row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1])
    return neighbors.filter(neighbor => !neighbor.visited);
}



