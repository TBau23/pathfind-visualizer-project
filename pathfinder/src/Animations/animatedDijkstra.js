export function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if ( i === visitedNodesInOrder.length) { // if at index one past length of visited nodes in order aka at the end
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i); // why 10 ?
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i]; // take first visited node and animate it
            document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visted';
        }, 10 * i);
    };
};

export function animateShortestPath(nodesInShortestPathOrder) {
    for ( let i = 0; i < nodesInShortestPathOrder; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 
            'node node-shortest-path';
        }, 50 * i);
    };
};


