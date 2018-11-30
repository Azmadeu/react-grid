import React, { Fragment } from 'react';
import Tr from 'src/components/mainContainer/tr';
import { firstRow } from 'src/constants';

const MainContainer = props => {
  console.log(firstRow);
  return (
    <Fragment>
      <tr>
       <td colSpan={6}>
         <input type="text"/>
       </td>
      </tr>
      {
        Array.from({ length: 20 }).map((_, i) =>
          <Tr
            index={i + 1}
            key={i}
          />
        )
      }
    </Fragment>
  )
};


export default MainContainer;