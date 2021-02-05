// Dijkstra's Shortest Path Algorithm
// using Clement's implementation 

export function dijkstras(grid, start, end) { 
    const visitedNodesInOrder = [];
    start.distance = 0 
    // need to grab all unvisited nodes
    const unvisitedNodes = getAllNodes(grid) // array
    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes); // in place sort, ascending order - on first loop, the start node is only one with any distance
        const closestNode = unvisitedNodes.shift(); // taking closest node from front of 'queue', removes it
        if(closestNode.wall) continue; // if the node is a wall we don't track it in any way - just skip it
        if(closestNode.distance === Infinity) return visitedNodesInOrder; // if the closest node is infinity, the search is stuck
        closestNode.visited = true; // node has been visited at this point
        visitedNodesInOrder.push(closestNode); // track that you have visited it
        if(closestNode === end) return visitedNodesInOrder; 
        updateUnvisitedNeighbors(closestNode, grid);
        
    }
}

function updateUnvisitedNeighbors(node, grid) { // receives the most recently processed node from the search
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid); // finds its neighbors - no diagonals. Array
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.prevNode = node;
    } 
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node; // destructure node to access its location in grid
    if(row > 0) neighbors.push(grid[row - 1][col]); // mark node that is one above 
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // node that is one below
    if(col > 0) neighbors.push(grid[row][col - 1]); // to the left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]) // to the right
    return neighbors.filter(neighbor => !neighbor.visited); // filter out ones already visited
}

function sortNodesByDistance(nodes) {
    nodes.sort((a, b) => a.distance - b.distance);
}

export function getAllNodes(grid) {
    // nodes is an array of objects
    const allNodes = []
    for (let i = 0; i < grid.length; i++) {
        let row = grid[i]
        for (let j = 0; j < row.length; j++) {
            allNodes.push(row[j])
        }
    }
    return allNodes
}

// only works if it is called after the main algorithm - returns the route 
export function getNodesInShortestPathOrder(endNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while(currentNode) { // prev node of first node in list will be null
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.prevNode;
    }
    return nodesInShortestPathOrder;
}