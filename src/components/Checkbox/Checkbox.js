import React, { Component, PropTypes } from 'react';
import {CustomInput} from 'reactstrap';

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label, id } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label, id);
  }

  render() {
    const { label, id } = this.props;
    const { isChecked } = this.state;

    return (
        <CustomInput
        type="checkbox"
        label={label}
        value={id}
        id={id}
        checked={isChecked}
        onChange={this.toggleCheckboxChange}
        />
    );
  }
}

// Checkbox.propTypes = {
//   label: PropTypes.string.isRequired,
//   handleCheckboxChange: PropTypes.func.isRequired,
// };

export default Checkbox;