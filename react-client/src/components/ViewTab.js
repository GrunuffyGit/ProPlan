import React, { useState } from 'react';
import PlanTable from './PlanTable';

const ViewTab = (props) => {

  return (
    <div>
        <PlanTable activity={props.activities}/>
    </div>
  );
}

export default ViewTab;