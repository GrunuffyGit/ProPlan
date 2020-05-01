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

export function getPlan(user_id){
    return fetch(`/plans/${user_id}`,
    {
        method: "GET"
    }).then(res => {
        return res.json();
    });
}

export function createPlan(planJSON){
    return fetch(`/plans`,
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