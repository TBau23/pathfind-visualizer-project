export function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if ( i === visitedNodesInOrder.length) { // if at index one past length of visited nodes in order aka at the end
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            },  10 * i); // why 10 ? if it matches the next timeout, then highlighting the shortest path will start right 
            // when the search appears to finish. If it's any faster, than it will overtake the other animation and the final path 
            // wont appear in full
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i]; // take first visited node and animate it
            
            document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }, 10 * i);
    };
};

export function animateShortestPath(nodesInShortestPathOrder) {
    for ( let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            
            document.getElementById(`node-${node.row}-${node.col}`).className = 
            'node node-shortest-path';
        }, 50 * i); // determines how quickly the final path highlights
    };
};


