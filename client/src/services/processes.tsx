import { toast } from 'react-toastify';

const apiUrl = 'http://localhost:3000';

export async function getProcesses() {
  try {
    const response = await fetch(`${apiUrl}/process?user=Miguel`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const processes = await response.json();
    // console.log(processes);
    return processes;
  } catch (error) {
    console.log(error);
    toast.error('🚨 occurs during on getting process', {
      icon: () => <img src="/icon.png" width={20} />,
    });
  }
}

// export async function postEvent (event) {
//   const stringyEvent = JSON.stringify(event);
//   // console.log (event,stringyEvent);
//   await fetch(`${dbUrl}/events`,{
//     method: "POST",
//     headers:{
//       "Content-Type": "application/json"
//     },
//     body:stringyEvent
//   })
//   .then(response => {
//     // console.log(response);
//     return response;
//   })
//   .catch(error => {
//     alert(error);
//   })
// }
