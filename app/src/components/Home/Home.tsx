import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { signInWithGoogle } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { navigateToCardSets } from "../../utils/navigateUtils";

const Home = () => {
  const { account } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      navigateToCardSets(navigate);
    }
  }, [account]);

  return (
    <div
      className="h-screen overflow-hidden bg-center bg-no-repeat bg-cover bg-mobile-landing md:bg-desktop-landing"
      data-testid="testHome"
    >
      <h1 className="p-5 text-center text-black text-7xl font-julius">
        Cardival
      </h1>
      <div className="flex flex-col items-center justify-around text-3xl h-4/5">
        <p className="relative px-20 py-5 text-center bottom-10">
          Elevate your learning journey with personalized flashcards.{" "}
        </p>
        <p className="mx-20 text-center text-white">
          Create an account or Log in with{" "}
          <span
            className="inline-block px-4 py-2 text-white transition-transform duration-300 ease-in-out border border-gray-300 rounded-full shadow-lg cursor-pointer bg-googleBlue hover:scale-105"
            onClick={signInWithGoogle}
            data-testid="googleSignInButton"
          >
            Google
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;
