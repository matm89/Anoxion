import { authStore } from "../context/auth";


export interface LoginRequestBody {
  email: string;
  password: string;
}

export function authentificate (user:LoginRequestBody) {

  const { login } = authStore()

  const { email , password } = user;
  
  if(email == 'test@email.com' && password == 'password') {
    return login();
  }
}

export function logout () {

  const { logout } = authStore();

  return logout();

}