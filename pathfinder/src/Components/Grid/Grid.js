import React from 'react';
import './Grid.css';
import Node from '../Node/Node';
import {animateDijkstra} from '../../Animations/animatedDijkstra';
import {dijkstras, getNodesInShortestPathOrder} from '../../Algorithms/dijsktras';
import { parseRowAndColumn } from '../../Utilities/parseRowAndColumn';

const DEFAULT_START_ROW = 7;
const DEFAULT_START_COLUMN = 10;
const DEFAULT_END_ROW = 7;
const DEFAULT_END_COLUMN = 30;

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
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        
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

    updateStartNode(nodes, row, col) {
        const newGrid = nodes.slice();
        const oldStart = newGrid[DEFAULT_START_ROW][DEFAULT_START_COLUMN];
        oldStart.start_node = false;
        const targetNode = newGrid[row][col];
        const newStart = {
            ...targetNode,
            start_node: true
        };
        newGrid[row][col] = newStart;
        return newGrid;
    }

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
        node.style.display = 'block';
        console.log('drop')
        const row = parseRowAndColumn(e.target.id)[0];
        const col = parseRowAndColumn(e.target.id)[1];
        console.log(row, col)
        const updatedGrid = this.updateStartNode(this.state.nodes, row, col);
        this.setState({nodes: updatedGrid});
    }

    handleDragOver(e) {
        e.preventDefault()
    }

    visualizeDijkstra() {
        const {nodes} = this.state
        const startNode = nodes[DEFAULT_START_ROW][DEFAULT_START_COLUMN];
        const endNode = nodes[DEFAULT_END_ROW][DEFAULT_END_COLUMN];
        const visitedNodesInOrder = dijkstras(nodes, startNode, endNode);
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