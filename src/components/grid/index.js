import React, { PureComponent } from 'react';
import Tr from 'src/components/grid/tr';
import { horizontalRows, letters } from 'src/constants';
import '../../App.css';

const FORMULA_ENUM = ['SUM', 'AVERAGE', 'CONCAT', 'HYPERLINK'];

class MainContainer extends PureComponent {

  state = {
    value: '',
    currentCell: '',
    calculateFormula: '',
    formulaHasChanged: false,
  };

  componentDidMount() {
    const { coordinates, focusList } = this.props;

    const cell = focusList[focusList.length - 1];

    const label = (coordinates[cell && cell[0]] && coordinates[cell[0]][cell].label);

    const value = (coordinates[cell && cell[0]] && coordinates[cell[0]][cell].value);

    this.setState({ value: (value || label || ''), currentCell: 'A1' })
  }

  componentWillReceiveProps(nextProps) {
    const { focusList, coordinates } = nextProps;

    let cell = focusList[focusList.length - 1] || 'A1';

    if (this.state.calculateFormula) {
      cell = focusList[0];
    }

    if (
      JSON.stringify(this.props.coordinates[cell[0]][cell]) !== JSON.stringify(coordinates[cell[0]][cell]) ||
      JSON.stringify(this.props.focusList) !== JSON.stringify(focusList)
    ) {

      const label = (coordinates[cell && cell[0]] && coordinates[cell[0]][cell].label);

      const value = (coordinates[cell && cell[0]] && coordinates[cell[0]][cell].value);

      this.setState({
        currentCell: cell,
        value: (value || label)
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.value[0] === '=' && !this.state.formulaHasChanged){
      this.props.clearFocusList(0, 0);

      this.setState({ formulaHasChanged: true })
    } else if (nextState.value[0] === '=') {
      FORMULA_ENUM.forEach(formula => {
        if (nextState.value.toUpperCase().includes(formula) && this.state.calculateFormula !== formula) {
          this.setState({ calculateFormula: formula });
        }
      });
    } else if (nextState.calculateFormula !== '') {
      this.setState({ calculateFormula: '', formulaHasChanged: false })
    }
  }

  handlePress = event => {
    if (event.key === 'Enter') {
      event.target.blur();

      const { calculateCellWithFormula, clearFocusList } = this.props;

      const { currentCell, calculateFormula } = this.state;

      const value = event.target.value;

      const newArr = value.match(/([^\)]+)\((.*)\)/)[2].replace(/\s+/gi, '').split(',');

      const hyperlink = {
        url: newArr[0],
        text: newArr[1],
      };

      clearFocusList();

      calculateCellWithFormula(currentCell, calculateFormula, value, hyperlink)
    }
  };

  handleChange = event => {
    if (event.key === 'Enter') {
      event.target.blur();
    } else {
      const { currentCell } = this.state;

      const keys = ['label', 'value'];

      this.props.updateFieldsKeys(currentCell[0], currentCell.slice(1), event.target.value, keys);

      this.setState({ value: event.target.value });
    }
  };

  render() {
    const { value, currentCell, calculateFormula } = this.state;

    return (
      <div className='grid-app'>
        <div className='input-container'>
          <span className='grid-cell'>
            {currentCell}
          </span>
          <input
            type='text'
            value={value}
            onKeyPress={this.handlePress}
            onChange={this.handleChange}
          />
        </div>
        <table className='grid'>
          <tbody>
          <tr>
            <td/>
            {
              letters.map((letter, i) =>
                <td key={i}>{letter}</td>
              )
            }
          </tr>
          {
            Array.from(horizontalRows).map((_, i) =>
              <Tr
                {...this.props}
                index={i + 1}
                key={i}
                formula={calculateFormula}
                currenetCell={currentCell}
              />
            )
          }
          </tbody>
        </table>
      </div>
    )
  }
}


export default MainContainer;