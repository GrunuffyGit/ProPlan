import React, { useState } from 'react';
import PlanTable from './PlanTable';

const ViewTab = (props) => {

  return (
    <div>
        <PlanTable plan={props.plan} activity={props.activities}/>
    </div>
  );
}

export default ViewTab;