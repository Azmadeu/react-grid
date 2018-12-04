import { connect } from "react-redux";
import MainContainer from 'src/components/grid/index'
import {
  updateFieldsKeys,
  focusCell,
  calculateCellWithFormula,
  updateCellsMethod,
  clearFocusList
} from 'src/actions/index';

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