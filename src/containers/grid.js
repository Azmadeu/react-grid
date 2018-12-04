import { connect } from "react-redux";
import MainContainer from '../components/grid/index'
import {
  updateFieldsKeys,
  focusCell,
  calculateCellWithFormula,
  updateCellsMethod,
  clearFocusList
} from '../actions';

const mapStateToProps = state => {
  return {
    coordinates: state.Coordinates,
    focusList: state.FocusList
  };
};

const mapDispatchToProps = {
  calculateCellWithFormula,
  updateFieldsKeys,
  updateCellsMethod,
  clearFocusList,
  focusCell,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);