// Dijkstra's Shortest Path Algorithm
// using Clement's implementation - 

export function dijkstras(grid, start, end) {
    const visitedNodesInOrder = [];
    start.distance = 0 
    // need to grab all unvisited nodes
    const unvisitedNodes = getAllNodes(grid) // array
    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
    }




}


function sortNodesByDistance(nodes) {
    
}


function getAllNodes(grid) {
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