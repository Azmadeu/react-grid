import React, { PureComponent } from 'react';
import Td from './td';
import { verticalRows, letters } from 'src/constants';

class Tr extends PureComponent {
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
              key={i}
              index={index}
              letter={letters[i]}
            />
          )
        }
      </tr>
    );
  }
}

export default Tr;