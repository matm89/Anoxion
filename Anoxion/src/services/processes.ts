const dbUrl = 'http://localhost:3001';

export async function getProcesses (user) {
  try {
    const response = await fetch(`${dbUrl}/events`);
    if(!response.ok){
      throw new Error ('Server error! status:',response.status);
    }
    const data = await response.json()
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function postEvent (event) {
  const stringyEvent = JSON.stringify(event);
  // console.log (event,stringyEvent);
  await fetch(`${dbUrl}/events`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body:stringyEvent
  })
  .then(response => {
    // console.log(response);
    return response;
  })
  .catch(error => {
    alert(error);
  })
}