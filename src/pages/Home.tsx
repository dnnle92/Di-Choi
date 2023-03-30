import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SignUp from "./SignUp";

const Home = () => {
  const context = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      {!context?.session ? <SignUp /> : <></>}
    </div>
  );
};

export default Home;
