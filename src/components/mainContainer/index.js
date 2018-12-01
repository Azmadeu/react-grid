import React, { Fragment } from 'react';
import Tr from 'src/components/mainContainer/tr';
import { horizontalRows, letters } from 'src/constants';

const MainContainer = () => {
  return (
    <Fragment>
      <tr>
        <td />
        {
          letters.map((letter, i) =>
            <td key={i}>{letter}</td>
          )
        }
      </tr>
      {
        Array.from(horizontalRows).map((_, i) =>
          <Tr index={i + 1} key={i} />
        )
      }
    </Fragment>
  )
};


export default MainContainer;