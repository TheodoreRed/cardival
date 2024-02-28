import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { getAccountByUid } from "../../services/accountApi";
import CardSet from "../../models/Card/CardSet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { navigateHome, navigateToCardSets } from "../../utils/dashboardUtils";

const Dashboard = () => {
  const { userid, cardsetid } = useParams();
  const navigate = useNavigate();
  const { account, setAccount } = useContext(AuthContext);
  const [activeSet, setActiveSet] = useState<CardSet | null>(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!account) {
        const response = await getAccountByUid(userid as string);
        if (response) setAccount(response);
      }
    };

    fetchAccountData();
  }, [userid, account, setAccount]);

  useEffect(() => {
    if (account && cardsetid) {
      const setActiveCardSetFromAccount = () => {
        const foundSet = account.cardSets.find(
          (set) => set.title === cardsetid
        );
        if (foundSet) setActiveSet(foundSet);
      };

      setActiveCardSetFromAccount();
    }
  }, [account, cardsetid]);

  useEffect(() => {
    if (!account) {
      navigateHome(navigate);
    }
  }, [account, navigate]);

  return (
    <div className="min-h-screen bg-googleBlue">
      <div className="relative">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="absolute text-white duration-300 cursor-pointer text-l top-5 left-5 hover:text-black"
          onClick={() => navigateToCardSets(navigate)}
        />
        <h2 className="p-8 text-5xl text-center text-white bg-blue-600 font-julius">
          {cardsetid}
        </h2>
        <FontAwesomeIcon
          icon={faGear}
          className="absolute text-3xl text-white duration-300 cursor-pointer top-10 right-5 hover:text-black"
        />
      </div>
      <div className="relative">
        <button className="absolute px-4 py-2 text-xl font-semibold text-black duration-300 ease-in-out border rounded-lg shadow-lg top-7 right-10 bg-brightYellow hover:bg-yellow-500 hover:border-transparent hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brightYellow focus:ring-opacity-50 font-julius">
          Edit Set
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
