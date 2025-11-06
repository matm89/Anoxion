import Toast from "../components/toast";
import { authStore } from "../context/auth";

const {login,  logout} = authStore()

export interface LoginRequestBody {
  email: string;
  password: string;
}

export async function authentificate (user:LoginRequestBody) {

  const { email , password } = user;

  console.log(user);
  if(email == 'test@email.com' && password == 'password') {
    Toast({title: 'Login success ✅'});
    login();
    return email;
  } else {
    Toast({ title: "Invalid credentials ❌" });
    return false;
  }
}

export function desauthentificate () {

  return logout();

}