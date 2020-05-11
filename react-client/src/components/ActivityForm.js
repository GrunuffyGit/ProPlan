import React, { useState } from "react";
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import classnames from 'classnames';
import AddActivityForm from "./AddActivityForm";
import EditActivity from "./EditActivity";

function ActivityForm (props){
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return(
        <div>
            <Nav tabs>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}>Add Activity
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}>Edit an Activity
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <AddActivityForm 
                    plan={props.plan}
                    update={props.update}
                    day={props.day}/>
            </TabPane>
            <TabPane tabId="2">
                <EditActivity
                    activity={props.activity} 
                    update={props.update} 
                    day={props.day} />
            </TabPane>
          </TabContent>
        </div>
    );
}

export default ActivityForm;