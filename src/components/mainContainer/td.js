import React, { PureComponent } from 'react';

class Td extends PureComponent {

  handleClick = event => {
    event.stopPropagation();

    if (event.ctrlKey) {
      console.log("Ctrl+click has just happened!");
    }
  };

  render() {
    return (
      <td className='grid-field' onClick={this.handleClick}>
        {this.props.letter + this.props.index}
      </td>
    )
  }
}

export default Td;