import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { signInWithGoogle, signOut } from "../../firebaseConfig";

const Home = () => {
  const { account } = useContext(AuthContext);

  useEffect(() => {}, [account]);

  if (account) {
    return (
      <>
        <div>{JSON.stringify(account)}</div>
        <button onClick={signOut}>Log Out</button>
      </>
    );
  }
  return (
    <div>
      <div className=" text-red-700 text-7xl">Home works</div>
      <button className=" bg-emerald-500" onClick={signInWithGoogle}>
        Log In With Google
      </button>
    </div>
  );
};

export default Home;
