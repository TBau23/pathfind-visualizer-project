import React from 'react';
import './Grid.css';
import Node from '../Node/Node';

class Grid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            nodes: []
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

    render() {
        const {nodes} = this.state;
        console.log(nodes)
        
        return (
            <div className='grid'>
                {nodes.map((row, i) => {
                    return (
                        <div key={i}>
                            {row.map((node, j) => {
                                return (
                                    <Node key={i * 40 + j} ></Node>
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