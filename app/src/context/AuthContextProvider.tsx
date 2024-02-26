import { ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../firebaseConfig";
import { createNewAccount, getAccountByUid } from "../services/accountApi";
import Account from "../models/Account/Account";

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      if (user) {
        const res = await getAccountByUid(user.uid);
        if (res && res._id) {
          setAccount(res);
        } else {
          // Create them an account
          const newAccount: Account = {
            uid: user.uid,
            displayName: user.displayName ?? "",
            photoURL: user.photoURL ?? "",
            email: user.email ?? "",
            flashcardSets: [],
          };

          setAccount(await createNewAccount(newAccount));
        }
      }
    };

    fetchAccount();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, account, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
