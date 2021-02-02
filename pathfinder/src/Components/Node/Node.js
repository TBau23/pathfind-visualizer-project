import React from 'react';
import './Node.css'

class Node extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            wall: null,
            
        }
    }

    buildWall() {
        this.setState({wall: true})
    }

    render() {
    return (
        <div 
        className={`${this.state.wall ? 'wall' : ''} node`}
        onMouseEnter={this.props.mouseStatus ? () => this.buildWall() : null}
         >
            {this.props.value}
        </div>
    )
    }
}

export default Node;
