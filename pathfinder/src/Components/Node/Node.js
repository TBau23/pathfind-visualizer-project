import React from 'react';
import './Node.css'

function Node(props) {

    return (
        <div className='node'>
            {props.value}
        </div>
    )
}

export default Node;
