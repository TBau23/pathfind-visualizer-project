import React from 'react';
import './Grid.css';
import Node from '../Node/Node';
import {animateDijkstra} from '../../Animations/animatedDijkstra';
import {dijkstras, getNodesInShortestPathOrder} from '../../Algorithms/dijsktras';
import { aStar } from '../../Algorithms/aStar';
import { parseRowAndColumn } from '../../Utilities/utilities';

// const DEFAULT_START_ROW = 7;
// const DEFAULT_START_COLUMN = 10;
// const DEFAULT_END_ROW = 7;
// const DEFAULT_END_COLUMN = 30;

class Grid extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            nodes: [],
            mouseDown: false,
            default_nodes: {
                start_row: 7,
                start_col: 10,
                end_row: 7,
                end_col: 30
            }
        }

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        
    }

    createNode(col, row) {
        return {
            wall: false,
            start_node: col === this.state.default_nodes.start_col && row === this.state.default_nodes.start_row,
            end_node: col === this.state.default_nodes.end_col && row === this.state.default_nodes.end_row,
            weight: false,
            col: col,
            row: row,
            distance: Infinity,
            visited: false,
            prevNode: null,
            h_cost: Infinity,
            f_cost: Infinity,
        }
    }

    generateGrid() {
        const nodes = []
        for (let row = 0; row < 25; row++) {
            const currentRow = [];
            for (let col = 0; col < 60; col++) {
                currentRow.push(this.createNode(col, row))
            }
            nodes.push(currentRow)
        }
        return nodes
    }

    clearBoard() {
        const grid = this.generateGrid()
        this.setState({nodes: grid})
    }

    componentDidMount() {
        const grid = this.generateGrid()
        this.setState({nodes: grid})
    }

    updateGridWalls(nodes, row, col) {
        const newGrid = nodes.slice() // create copy so that we do not directly mutate state
        const currentNode = newGrid[row][col];
        const newNode = {
            ...currentNode,
            wall: !currentNode.wall
        };
        newGrid[row][col] = newNode; // replace current node with new node, simply flipping the wall
        return newGrid; 
    }

    updateDefaultNode(nodes, row, col, nodeType) {
        const newGrid = nodes.slice();
        if(nodeType === 'start') {
            const oldStart = newGrid[this.state.default_nodes.start_row][this.state.default_nodes.start_col];
            oldStart.start_node = false;
            const targetNode = newGrid[row][col];
            const newStart = {
            ...targetNode,
            start_node: true
            };
            newGrid[row][col] = newStart;
            this.setState({default_nodes: {
            ...this.state.default_nodes, start_row: row, start_col: col
            }})
        } else {
            const oldEnd = newGrid[this.state.default_nodes.end_row][this.state.default_nodes.end_col]
            oldEnd.end_node = false;
            const targetNode = newGrid[row][col];
            const newEnd = {
                ...targetNode,
                end_node: true
            };
            newGrid[row][col] = newEnd;
            this.setState({default_nodes: {
                ...this.state.default_nodes, end_row: row, end_col: col
            }})
        };
        
        return newGrid;
    };

    handleMouseDown(row, col) {
        const updatedGrid = this.updateGridWalls(this.state.nodes, row, col);
        this.setState({nodes: updatedGrid, mouseDown: true});
    }

    handleMouseUp() {
        this.setState({mouseDown: false})
    }

    handleMouseEnter(row, col) {
        if(!this.state.mouseDown) return;
        const updatedGrid = this.updateGridWalls(this.state.nodes, row, col)
        this.setState({nodes: updatedGrid})
    }

    handleDrop(e) {
        e.preventDefault();
        const node_id = e.dataTransfer.getData('node_id');
        const node = document.getElementById(node_id);
        const startOrEnd = node.className.split(" ")[1] // identifies whether were moving start or end node
        node.style.display = 'block';
        console.log('drop')
        const row = parseRowAndColumn(e.target.id)[0];
        const col = parseRowAndColumn(e.target.id)[1];
        if(typeof row === 'number' && typeof col === 'number') {
            const updatedGrid = this.updateDefaultNode(this.state.nodes, row, col, startOrEnd);
            this.setState({nodes: updatedGrid});
        }
    }

    handleDragOver(e) {
        e.preventDefault()
    }

    visualizeDijkstra() {
        const {nodes} = this.state
        const startNode = nodes[this.state.default_nodes.start_row][this.state.default_nodes.start_col];
        const endNode = nodes[this.state.default_nodes.end_row][this.state.default_nodes.end_col];
        const visitedNodesInOrder = dijkstras(nodes, startNode, endNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeAstar() {
        const {nodes} = this.state;
        const startNode = nodes[this.state.default_nodes.start_row][this.state.default_nodes.start_col];
        const endNode = nodes[this.state.default_nodes.end_row][this.state.default_nodes.end_col];
        const visitedNodesInOrder = aStar(nodes, startNode, endNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);

    }

    render() {
        const {nodes} = this.state;
        
        return (
            <div>
                
                <div className='grid' onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
                <button style={{marginBottom: 30}} onClick={() => this.clearBoard()}>Reset Board</button>
                <button style={{marginBottom: 30}} onClick={() => this.visualizeDijkstra()}>Run Dijkstra's Pathfinding</button>
                <button onClick={() => this.visualizeAstar()}>Run A-Star Algorithm</button>
                    {nodes.map((row, i) => {
                        return (
                            <div key={i}>
                                {row.map((node, j) => {
                                    return (
                                        <Node
                                            key={i * 60 + j}
                                            mouseStatus={this.state.mouseDown}
                                            nodeInfo={node}
                                            handleMouseDown={this.handleMouseDown}
                                            handleMouseUp={this.handleMouseUp}
                                            handleMouseEnter={this.handleMouseEnter}
                                            handleDragOver={this.handleDragOver}
                                            handleDrop={this.handleDrop}
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