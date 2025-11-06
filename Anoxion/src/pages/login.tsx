import { authStore, type authState } from "../context/auth";


export function Login () {

  const auth: authState = authStore.getState();

  function authentificate (){
    if (!auth) throw new Error('Invalid user');
  }

  console.log(auth);
  return (
    <>
      <p>hello from Login</p>
      <form action={authentificate}>
        <label>E-Mail:</label>
        <input type="text" name="email"/>
        <label htmlFor="">Password</label>
        <input type="text" name="password"/>
        <button type="submit"> Login </button>
      </form>
    </>
  );
}