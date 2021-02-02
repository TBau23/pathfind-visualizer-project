import React from 'react';
import './Node.css'

class Node extends React.Component {
    
    

    render() {
        const { nodeInfo, mouseStatus, handleMouseDown, handleMouseUp, handleMouseEnter } = this.props

    return (
        <div 
        className={`${nodeInfo.wall ? 'wall' : ''} node`}
        
        onMouseEnter={() => handleMouseEnter(nodeInfo.row, nodeInfo.col)}
        onMouseDown={() => handleMouseDown(nodeInfo.row, nodeInfo.col)}
        onMouseUp={() => handleMouseUp()}
        
        >
        </div>
    )
    }
}

export default Node;
