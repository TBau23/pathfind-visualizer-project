import React from 'react';
import './Grid.css';
import Node from '../Node/Node';

class Grid extends React.Component {
    constructor(props) {
        super(props)
        

        this.state = {
            nodes: [],
            mouseDown: false,

        }
    }

    componentDidMount() {
        const nodes = []
        for (let row = 0; row < 15; row++) {
            const currentRow = [];
            for (let col = 0; col < 40; col++) {
                currentRow.push([])
            }
            nodes.push(currentRow)
        }
        this.setState({nodes : nodes})
    }

    handleMouseDown() {
        this.setState({mouseDown: true})
    }

    handleMouseUp() {
        this.setState({mouseDown: false})
    }

    

    render() {
        const {nodes} = this.state;
        console.log(nodes)
        
        return (
            <div className='grid' onMouseDown={() => this.handleMouseDown()} onMouseUp={() => this.handleMouseUp()}>
                {nodes.map((row, i) => {
                    return (
                        <div key={i}>
                            {row.map((node, j) => {
                                return (
                                    <Node key={i * 40 + j} mouseStatus={this.state.mouseDown} ></Node>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Grid;