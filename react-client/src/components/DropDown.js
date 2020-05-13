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
            <img className="loadingImg" src="https://steamuserimages-a.akamaihd.net/ugc/779615184453193381/6545C065131A71752DEC0EB8EFF64A166177DCFD/"></img>
        </div>
    );
  }

  return (
    <Dropdown id="selectDayBtn" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {props.buttonName}
        </DropdownToggle>
      <DropdownMenu>
        {props.ddOptions.map(item =>(<DropdownItem key={item} id={item} onClick={props.onClick}>{item}</DropdownItem>))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropDown;