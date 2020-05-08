import React, { useState } from 'react';
import { 
    Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem } from 'reactstrap';

const DropDown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  if(typeof props.ddOptions === "undefined"){
    return(
        <div>
            <h1>Loading...</h1>
        </div>
    );
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Select a Day
        </DropdownToggle>
      <DropdownMenu>
        {props.ddOptions.map(item =>(<DropdownItem id={item} onClick={props.onClick}>{item}</DropdownItem>))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropDown;