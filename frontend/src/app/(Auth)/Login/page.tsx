import Login from "@/components/layout/Auth/Login/Login";
import Nav from "@/components/UI/Nav/Nav";

const LoginPage = () => {

    const login = (
        <>
          <Nav />
          <Login /> 
        </>
    )

    return login;
}

export default LoginPage;