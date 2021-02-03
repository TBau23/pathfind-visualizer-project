import React from 'react';
import './Grid.css';
import Node from '../Node/Node';


const DEFAULT_START_ROW = 7
const DEFAULT_START_COLUMN = 10
const DEFAULT_END_ROW = 7
const DEFAULT_END_COLUMN = 30

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
            start_node: col === DEFAULT_START_COLUMN && row === DEFAULT_START_ROW,
            end_node: col === DEFAULT_END_COLUMN && row === DEFAULT_END_ROW,
            weight: false,
            col: col,
            row: row,
            distance: Infinity,
            visited: false,
            prevNode: null
        }
    }
    generateGrid() {
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

    clearBoard() {
        this.generateGrid()
    }

    componentDidMount() {
        this.generateGrid()
    }

    updateGrid(nodes, row, col) {
        let newGrid = nodes.slice() // create copy so that we do not directly mutate state
        const currentNode = newGrid[row][col];
        const newNode = {
            ...currentNode,
            wall: !currentNode.wall
        };
        newGrid[row][col] = newNode; // replace current node with new node, simply flipping the wall
        return newGrid;
    }

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
            <div>
                <button style={{marginTop: '50px'}} onClick={() => this.clearBoard()}>Reset Board</button>
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
            </div>
        )
    }
}

export default Grid;