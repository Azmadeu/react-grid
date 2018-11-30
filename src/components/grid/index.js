import React, { Component } from 'react';
import MainContainer from 'src/components/mainContainer';
import './table.css';

class Grid extends Component {
  render() {
    return (
      <div className='grid-app'>
        <bold className='grid-title'>React Grid</bold>
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