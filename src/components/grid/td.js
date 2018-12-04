import React, { Component } from 'react';
import { numberWithSpaces } from '../../lib';

class Td extends Component {

  state = {
    inFocusList: false,
    value: '',
    label: '',
    focused: false,
    letter: this.props.letter,
    num: this.props.index
  };

  componentDidMount() {
    const { letter, num } = this.state;

    const { label, value } = this.props.coordinates[letter][letter + num];

    this.setState({ label, value });

    document.addEventListener('mousedown', this.handleFocus);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleFocus);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { letter, num } = this.state;

    return (
      JSON.stringify(nextState) !== JSON.stringify(this.state) ||
      this.props.coordinates[letter][letter + num].label !== nextProps.coordinates[letter][letter + num].label
    )
  }

  componentWillReceiveProps(nextProps) {
    const { letter, num } = this.state;

    const { coordinates, focusList } = nextProps;

    const inFocusList = focusList.includes(letter + num);

    if (this.props.coordinates[letter][letter + num].label !== coordinates[letter][letter + num].label) {
      const { label, value } = coordinates[letter][letter + num];

      this.setState({ label, value })
    } else if (this.props.focusList.includes(letter + num) !== inFocusList) {

      this.setState({ inFocusList })
    }
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleFocus = event => {
    if (this.state.focused && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      const { focusList, formula, updateFieldsKeys } = this.props;

      const { letter, num, label, value } = this.state;

      if (event.ctrlKey && formula) {

        updateFieldsKeys(letter, num, label + event.target.id + ', ', ['label']);

        document.getElementById(focusList[0]).focus();

        this.setState({ focused: letter + num === focusList[0] })

      } else if (event.ctrlKey) {

        this.setState({ focused: false, inFocusList: true })
      } else if (formula) {
        const { calculateCellWithFormula } = this.props;

        const newValue = value || label;

        const newArr = newValue.match(/([^\)]+)\((.*)\)/)[2].replace(/\s+/gi, '').split(',');

        const hyperlink = { url: newArr[0], text: newArr[1] };

        calculateCellWithFormula(letter + num, formula, newValue, hyperlink);

        this.setState({ focused: false, inFocusList: false })
      } else {
        let label = this.state.label;

        if (label[0] === '$') {
          label = '$' + numberWithSpaces((+label.slice(1)).toFixed(2))
        }

        this.setState({ focused: false, inFocusList: false, label })
      }
    }
  };

  handleClick = event => {
    event.stopPropagation();

    const { focused, letter, num } = this.state;

    const { formula, focusList } = this.props;

    this.setState({ focused: true, inFocusList: true });

    if (event.ctrlKey && formula) {
      if (focused) {
        this.setState({ focused: false, inFocusList: false })
      }
      this.setState({ focused: false });
      document.getElementById(focusList[0]).focus();
    }

    this.props.focusCell(letter + num, event.ctrlKey);
  };

  handlePress = event => {
    if (event.key === 'Enter') {
      event.target.blur();

      const { formula, coordinates, clearFocusList } = this.props;

      const { letter, num } = this.state;

      const value = event.target.value;

      clearFocusList(0, 1);

      if (formula) {
        const { calculateCellWithFormula } = this.props;

        const newArr = value.match(/([^\)]+)\((.*)\)/)[2].replace(/\s+/gi, '').split(',');

        const hyperlink = { url: newArr[0], text: newArr[1] };

        calculateCellWithFormula(letter + num, formula, value, hyperlink);
      }

      let label = value;

      if (coordinates[letter][letter + num].dataType === 'money') {
        label = '$' + numberWithSpaces((+value.slice(1)).toFixed(2))
      }

      this.setState({ focused: false, inFocusList: false, label })
    }
  };

  handleChange = event => {
    const { letter, num, focused, value } = this.state;

    const { updateFieldsKeys } = this.props;

    const eventValue = event.target.value;

    const statesKey = [!!(focused && value) ? 'value' : 'label'];

    if (event.key === 'Enter') {
      event.target.blur();
    }

    updateFieldsKeys(letter, num, eventValue, statesKey);

    this.setState({ [statesKey]: eventValue })
  };

  render() {

    const {
      focused,
      letter,
      num,
      label,
      value,
      inFocusList
    } = this.state;

    const className = (focused ? 'focused inFocusList' : inFocusList ? 'inFocusList' : '');

    const setValue = (focused && value) ? value : JSON.stringify(label) !== 'null' ? label : '#NAME?';

    const cell = this.props.coordinates[letter][letter + num];

    return (
      <td
        ref={this.setWrapperRef}
        className={`grid-field ${className}`}
        onClick={this.handleClick}
      >
        {
          this.props.formula.includes('HYPERLINK') && cell.hyperlink
          ? <a
              href={cell.hyperlink.url}
              className='hyperlink'
              target='_blank'
            >
              {cell.hyperlink.text}
            </a>
          : <input
              type="text"
              id={letter + num}
              placeholder={letter + num}
              onKeyPress={this.handlePress}
              onChange={this.handleChange}
              className={(inFocusList ? 'inFocusList' : '')}
              value={setValue}
            />
        }

      </td>
    )
  }
}

export default Td;