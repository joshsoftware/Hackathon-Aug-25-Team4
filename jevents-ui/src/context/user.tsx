import { USER_LOCALSTORAGE_KEY } from "@/constants/user";
import {
  getLocalStorageData,
  resetLocalStorageData,
  setLocalStorage,
} from "@/lib/localStorage";
import { User, UserLocalStorage } from "@/types/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type UserRoleContextType = {
  data: UserLocalStorage | null;
  setUserData: (role: UserLocalStorage | null) => void;
};

const UserDataContext = createContext<UserRoleContextType | undefined>(
  undefined,
);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<UserLocalStorage | null>(null);

  useEffect(() => {
    const data = getLocalStorageData<UserLocalStorage | null>(
      USER_LOCALSTORAGE_KEY,
    );

    setData(data ?? null);
  }, []);

  useEffect(() => {
    if (data) {
      setLocalStorage<UserLocalStorage>(USER_LOCALSTORAGE_KEY, data);
    } else {
      resetLocalStorageData(USER_LOCALSTORAGE_KEY);
    }
  }, [data]);

  return (
    <UserDataContext.Provider value={{ data: data, setUserData: setData }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserRole must be used inside <UserRoleProvider>");
  }
  return context;
}
