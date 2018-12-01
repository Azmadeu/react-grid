import React, { Component } from 'react';
import MainContainer from 'src/components/mainContainer';
import './table.css';

class Grid extends Component {
  render() {
    return (
      <div className='grid-app'>
        <div className='input-container'>
          <input type='text' />
        </div>
        <table className='grid'>
          <tbody>
          <MainContainer/>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Grid;