import { authStore } from "../context/auth";
import Toast from "../components/toast/index";


export function Login () {

  const auth = authStore((state) => state.auth);

  function authentificate () {

    try {
      if (!auth) throw new Error('Invalid user');
      
    } catch (error) {
      Toast({title: (error as Error).message});
    }
  }

  // console.log(auth);
  return (
    <div className="grid place-items-center h-dvh">
      <p>hello from Login</p>
      <form action={authentificate}>
        <label>E-Mail:</label>
        <input type="text" name="email"/>
        <label htmlFor="">Password</label>
        <input type="text" name="password"/>
        <button type="submit"> Login </button>
      </form>
    </div>
  );

}