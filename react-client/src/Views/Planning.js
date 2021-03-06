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
import { hasPlan, getActivities, getPlan } from '../utils/apiCalls';
import ViewTab from '../components/ViewTab';
import EditTab from '../components/EditTab';
import laptop from "../images/laptop.png"
import pencil from "../images/avatar.png"

const Planning = ({match}) =>{
  const { params: { planName, planID } } = match;
  const { loading, user } = useAuth0();
  const [belongToUser, setBelongToUser] = useState();
  const [activities, setActivities] = useState();
  const [plan, setPlan] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const checkingPlanBelongToUser = async() =>{
    let JSONbody = {
      user_id: user.sub,
      plan_id: planID
    }
    const doesBelong = await hasPlan(JSONbody);
    setBelongToUser(doesBelong[0].exists);
  }
  const loadPlanAndActivities = async() => {
    const grabActivities = await getActivities(planID);
    setActivities(grabActivities);
    const grabPlan = await getPlan(planID);
    setPlan(grabPlan[0]);
  }

  const updateActivities = e => {
    loadPlanAndActivities();
  }

  useEffect(()=>{
    if(user){
      checkingPlanBelongToUser();
    }
  },[user])

  useEffect(()=>{
    if(belongToUser){
      loadPlanAndActivities();
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
        <img className="loadingImg" src="https://steamuserimages-a.akamaihd.net/ugc/779615184453193381/6545C065131A71752DEC0EB8EFF64A166177DCFD/"></img>
      </div>);
  }

  if(typeof belongToUser !== "undefined" && !belongToUser){
    return(
      <div>
        <h1>This plan doesn't belong to you.</h1>
      </div>
   
   );
  }

  return(
      <div className="App">
        <h1 id="planNameHeader">{planName}</h1>
          <Nav tabs>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}>View Activities <img className="tabImg" src={laptop} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}>Edit Activities <img className="tabImg" src={pencil} />
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <ViewTab plan={plan} activities={activities} />
            </TabPane>
            <TabPane tabId="2">
              <EditTab plan={plan} activities={activities} update={updateActivities} />
            </TabPane>
          </TabContent>
      </div>
  );
}

export default Planning;