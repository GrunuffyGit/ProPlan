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