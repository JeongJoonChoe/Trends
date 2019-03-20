import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'best-selling'
    }
    this.onSelectFilter = this.onSelectFilter.bind(this);
  }

  onSelectFilter(e) {
    this.props.onfilterClick(e);
    this.setState({
      current: e
    })
  }

  render() {
    return (
        <DropdownButton className="filter-button"
          variant='light'
          id='dropdown-basic-button'
          title={this.state.current}
          onSelect={this.onSelectFilter}
        >
          <Dropdown.Item eventKey='best-selling'>Best-Selling</Dropdown.Item>
          <Dropdown.Item eventKey='newest'>Newest</Dropdown.Item>
        </DropdownButton>
    )
  }
}

export default Filters;