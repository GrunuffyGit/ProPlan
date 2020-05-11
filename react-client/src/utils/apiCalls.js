export function doesUserExist(user_id) {
    return fetch(`/users/${user_id}`,
    {
        method: "GET"
    }).then((res) => {
        return res.json();
    })
}

export function createUser(userJSON){
    return fetch(`/users`,
    {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
        body: JSON.stringify(userJSON)
    }).then(res => {
        return res.json();
    });
}

export function getPlans(user_id){
    return fetch(`/plans/${user_id}`,
    {
        method: "GET"
    }).then(res => {
        return res.json();
    });
}

export function getPlan(plan_id){
    return fetch(`/plan/${plan_id}`,
    {
        method: "GET"
    }).then(res => {
        return res.json();
    });
}

export function addPlan(planJSON){
    return fetch(`/plan`,
    {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
        body: JSON.stringify(planJSON)
    }).then(res => {
        return res.json();
    });
}

export function editPlan(planJSON){
    return fetch(`/plan`,
    {
        method: "PUT",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
        body: JSON.stringify(planJSON)
    }).then(res => {
        return res.json();
    });
}

export function deletePlan(plan_id){
    return fetch(`/plan/${plan_id}`,
    {
        method: "DELETE"
    }).then(res => {
        return res;
    });
}

export function hasPlan(verifyJSON){
    return fetch(`/hasPlan`,
    {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
        body: JSON.stringify(verifyJSON)
    }).then(res => {
        return res.json();
    });
}

export function getActivities(plan_id){
    return fetch(`/activities/${plan_id}`,
    {
        method: "GET"
    }).then(res => {
        return res.json();
    });
}

export function addActivity(activityJSON){
    return fetch(`/activities`,
    {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
        body: JSON.stringify(activityJSON)
    }).then(res => {
        return res.json();
    });
}

export function editActivity(activityJSON){
    return fetch(`/activities`,
    {
        method: "PUT",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
        body: JSON.stringify(activityJSON)
    }).then(res => {
        return res.json();
    });
}

export function deleteActivity(activity_id){
    return fetch(`/activities/${activity_id}`,
    {
        method: "DELETE"
    }).then(res => {
        return res;
    });
}