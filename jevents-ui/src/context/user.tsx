import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type UserLocalStorage = {
  user: {
    role: string;
  };
};

type UserRoleContextType = {
  role: string | null;
  setRole: (role: string | null) => void;
};

const UserRoleContext = createContext<UserRoleContextType | undefined>(
  undefined,
);

export const USER_LOCALSTORAGE_KEY = "user-data";

function getLocalStorageData<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

export function UserRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const data = getLocalStorageData<UserLocalStorage | null>(
      USER_LOCALSTORAGE_KEY,
    );
    setRole(data?.user.role ?? null);
  }, []);

  useEffect(() => {
    if (role) {
      localStorage.setItem(
        USER_LOCALSTORAGE_KEY,
        JSON.stringify({ user: { role } }),
      );
    } else {
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    }
  }, [role]);

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error("useUserRole must be used inside <UserRoleProvider>");
  }
  return context;
}
