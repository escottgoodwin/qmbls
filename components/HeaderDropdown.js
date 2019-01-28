import React,{Component} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom'

export default class HeaderDropdown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Dropdown
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem><Link className="App-routes" to="/main">Main</Link></DropdownItem>
          <DropdownItem><Link className="App-routes" to="/teacher_dashboard">Teacher</Link></DropdownItem>
          <DropdownItem><Link className="App-routes" to="/course_dashboard">Course</Link></DropdownItem>
          <DropdownItem><Link className="App-routes" to="/test_dashboard">Test</Link></DropdownItem>
          <DropdownItem><Link className="App-routes" to="/add_test">Add Test</Link></DropdownItem>
          <DropdownItem><Link className="App-routes" to="/add_panels">Add Panels</Link></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
