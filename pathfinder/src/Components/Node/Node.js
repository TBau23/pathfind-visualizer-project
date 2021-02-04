import React from 'react';
import './Node.css'

class Node extends React.Component {
    
    render() {
        const { nodeInfo, handleMouseDown, handleMouseUp, handleMouseEnter } = this.props
        // going to have a variety of node types, class name will be determined based on that
        const nodeType = nodeInfo.wall ? 'wall' 
                : nodeInfo.start_node ? 'start' 
                : nodeInfo.end_node ? 'end' 
                : nodeInfo.weight ? 'weight'
                : ''
        const canBuildWall = !nodeInfo.start_node && !nodeInfo.end_node
    return (
        <div
        id={`node-${nodeInfo.row}-${nodeInfo.col}`}
        className={`${nodeType} node`}
        onMouseEnter={canBuildWall ? () => handleMouseEnter(nodeInfo.row, nodeInfo.col) : null}
        onMouseDown={canBuildWall ? () => handleMouseDown(nodeInfo.row, nodeInfo.col) : null}
        onMouseUp={() => handleMouseUp()}
        
        >
        </div>
    )
    }
}

export default Node;
