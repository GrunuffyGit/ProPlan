import React, {useState, useEffect} from 'react';
import { 
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import classnames from 'classnames';
import { useAuth0 } from "../react-auth0-spa";
import { hasPlan, getActivities } from '../utils/apiCalls';
import ViewTab from '../components/ViewTab';
import EditTab from '../components/EditTab';

const Planning = ({match}) =>{
  const { params: { planName, planID } } = match;
  const { loading, user } = useAuth0();
  const [belongToUser, setBelongToUser] = useState();
  const [activities, setActivities] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const checkingPlanBelongToUser = async() =>{
    let JSONbody = {
      user_id: user.sub,
      plan_id: planID
    }
    const doesBelong = await hasPlan(JSONbody);
    setBelongToUser(doesBelong[0].exists);
  }
  const loadActivities = async() => {
    const grabActivities = await getActivities(planID);
    setActivities(grabActivities);
  }
  useEffect(()=>{
    if(user){
      checkingPlanBelongToUser();
    }
  },[user])

  useEffect(()=>{
    if(belongToUser){
      loadActivities();
    }
  },[belongToUser])

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

  if(!belongToUser){
    return(
      <div>
        <h1>This plan doesn't belong to you.</h1>
      </div>
   
   );
  }

  return(
      <div className="App">
        <h1>{planName}</h1>
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
              <ViewTab activities={activities} />
            </TabPane>
            <TabPane tabId="2">
              <EditTab activities={activities}/>
            </TabPane>
          </TabContent>
      </div>
  );
}

export default Planning;