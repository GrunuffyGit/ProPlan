import React, {useState} from 'react';
import { 
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import classnames from 'classnames';
import { useAuth0 } from "../react-auth0-spa";

const Planning = ({match}) =>{
  const { params: { planID } } = match;
  const { loading, user } = useAuth0();
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  if (!user && !loading) {
    return (
    <div className="App">
      <h1>Please Login to view this page.</h1>
    </div>);
  }else if(loading){
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>);
  }

  return(
      <div className="App">
        <h1>{planID}</h1>
          <Nav tabs>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}>View Plan
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}>Edit Plan
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <h1>View</h1>
            </TabPane>
            <TabPane tabId="2">
              <h1>Edit</h1>
            </TabPane>
        </TabContent>
      </div>
  );
}

export default Planning;