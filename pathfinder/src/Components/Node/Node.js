import React from 'react';
import './Node.css'

class Node extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            wall: false,
            
        }
    }

    buildAndBreakWall() {
        if(!this.state.wall) {
            this.setState({wall: true});
            return;
        }
        this.setState({wall: false})
        
    }

    render() {
    return (
        <div 
        className={`${this.state.wall ? 'wall' : ''} node`}
        onMouseEnter={this.props.mouseStatus ? () => this.buildAndBreakWall() : null}
        onMouseDown={() => this.buildAndBreakWall()}
        >
            {this.props.value}
        </div>
    )
    }
}

export default Node;
