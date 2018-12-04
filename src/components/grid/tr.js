import React, { Component } from 'react';
import Td from './td';
import { verticalRows, letters } from 'src/constants';

class Tr extends Component {

  shouldComponentUpdate(nextProps) {
    const { focusList, index } = nextProps;

    return (
      JSON.stringify(focusList) !== JSON.stringify(this.props.focusList) &&
      ((this.props.focusList.length > focusList.length) && focusList.length === 1) ||
      !!(focusList[focusList.length - 1] && focusList[focusList.length - 1].slice(1) === index.toString()) ||
      nextProps.formula
    );
  }

  render() {
    const { index } = this.props;

    return (
      <tr>
        <td className='grid-td-index'>
       <span>
          {index}
       </span>
        </td>
        {
          Array.from(verticalRows).map((_, i) =>
            <Td
              {...this.props}
              key={i}
              letter={letters[i]}
            />
          )
        }
      </tr>
    );
  }
}

export default Tr;