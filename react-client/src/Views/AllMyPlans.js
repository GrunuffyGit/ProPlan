import React, {useState, useEffect} from 'react';
import { Row, Button } from 'reactstrap';
import { useAuth0 } from "../react-auth0-spa";
import { getPlan } from '../utils/apiCalls';
import PlanCard from '../components/PlanCards';

const AllMyPlans = () =>{
  const { loading, user } = useAuth0();
  const [plans, setPlans] = useState();
  const getPlans = async() => {
    const getPlansCall = await getPlan(user.sub);
    setPlans(getPlansCall);
  }
  useEffect(()=>{
    if(user){
      getPlans();
    }
  },[user])
  
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
      <h1> My Plans </h1>
      <Button size="lg"> Create Plan</Button>
      <Row>
        {plans ? plans.map(plan =>(<PlanCard key={plan.id} plan={plan}/>)): "No Plans"}
      </Row>
    </div>
  );
}

export default AllMyPlans;