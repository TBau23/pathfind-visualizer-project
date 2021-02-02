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
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

    }

    createNode(col, row) {
        return {
            wall: false,
            start_node: false,
            end_node: false,
            weight: false,
            col: col,
            row: row,
        }
    }

    componentDidMount() {
        const nodes = []
        for (let row = 0; row < 15; row++) {
            const currentRow = [];
            for (let col = 0; col < 40; col++) {
                currentRow.push(this.createNode(col, row))
            }
            nodes.push(currentRow)
        }
        this.setState({nodes : nodes})
    }

    updateGrid(nodes, row, col) {
        let newGrid = nodes.slice() // create copy so that we do not directly mutate state
        const currentNode = newGrid[row][col];
        const newNode = {
            ...currentNode,
            wall: !currentNode.wall
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }

    // how can I return the row and column of where the mouse is being pressed?

    handleMouseDown(row, col) {
        const updatedGrid = this.updateGrid(this.state.nodes, row, col);
        this.setState({nodes: updatedGrid, mouseDown: true});
    }

    handleMouseUp() {
        this.setState({mouseDown: false})
    }

    handleMouseEnter(row, col) {
        if(!this.state.mouseDown) return;
        const updatedGrid = this.updateGrid(this.state.nodes, row, col)
        this.setState({nodes: updatedGrid})
    }


    render() {
        const {nodes} = this.state;
        console.log(nodes)
        
        return (
            <div className='grid' >
                {nodes.map((row, i) => {
                    return (
                        <div key={i}>
                            {row.map((node, j) => {
                                return (
                                    <Node
                                        key={i * 40 + j}
                                        mouseStatus={this.state.mouseDown}
                                        nodeInfo={node}
                                        handleMouseDown={this.handleMouseDown}
                                        handleMouseUp={this.handleMouseUp}
                                        handleMouseEnter={this.handleMouseEnter}
                                         >

                                         </Node>
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