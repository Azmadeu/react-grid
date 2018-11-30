import React from 'react';
import Td from './td';
import { rows } from 'src/constants';

const Tr = props => {
  return (
    <tr>
      <td className='grid-td-index'>
       <span>
          {props.index}
       </span>
      </td>
      {
        Array.from(rows).map((_, i) => <Td key={i} index={i + 1}/> )
      }
    </tr>
  );
};


export default Tr;