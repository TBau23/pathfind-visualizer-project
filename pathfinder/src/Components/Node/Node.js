import React from 'react';
import './Node.css'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import SendIcon from '@material-ui/icons/Send';


class Node extends React.Component {

    dragStart(e) {
        const target = e.target;
        e.dataTransfer.setData('node_id', target.id);
        console.log(target.id)

        // setTimeout(() => {
        //     target.style.display = 'none'
        // }, 0);
    }

    // dragOver(e) {
    //     e.stopPropagation();
    // }
    
    render() {
        const { nodeInfo, handleMouseDown, handleMouseUp, handleMouseEnter} = this.props
        // going to have a variety of node types, class name will be determined based on that
        const nodeType = nodeInfo.wall ? 'wall' 
                : nodeInfo.start_node ? 'start' 
                : nodeInfo.end_node ? 'end' 
                : nodeInfo.weight ? 'weight'
                : ''
        const canBuildWall = !nodeInfo.start_node && !nodeInfo.end_node
        const isStart = nodeInfo.start_node
        const isEnd = nodeInfo.end_node

    return (
        <div
        id={`node-${nodeInfo.row}-${nodeInfo.col}`}
        className={`node ${nodeType}`}
        onMouseEnter={canBuildWall ? () => handleMouseEnter(nodeInfo.row, nodeInfo.col) : null}
        onMouseDown={canBuildWall ? () => handleMouseDown(nodeInfo.row, nodeInfo.col) : null}
        onMouseUp={() => handleMouseUp()}
        draggable={isStart || isEnd ? 'true' : 'false'}
        onDragStart={this.dragStart}
        onDragOver={this.dragOver}
        
        
        >
            {isStart ? <SendIcon fontSize='large' />: null}
            {isEnd ? <EmojiEventsIcon fontSize='large'/> : null}
        </div>
    )
    }
}

export default Node;
