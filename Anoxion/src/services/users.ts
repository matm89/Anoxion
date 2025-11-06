import Toast from "../components/toast";
import { authStore } from "../context/auth";


export interface LoginRequestBody {
  email: string;
  password: string;
}

export async function authentificate (user:LoginRequestBody) {
  
  const { email , password } = user;


  // console.log(user);
  if(email == 'test@email.com' && password == 'password') {
    Toast({title: 'Login success ✅'});
    authStore.getState().login();
    authStore.getState().setEmail(email);
    return true;
  } else {
    Toast({ title: "Invalid credentials ❌" });
    return false;
  }
}

export function desauthentificate (navigate: (path: string) => void): void {
  authStore.getState().logout();

  Toast({title: 'Loged out ❎'});
  
  navigate('/login');
}