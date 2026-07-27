import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(() => {
      try {
        const storedUser =
          localStorage.getItem(
            "user"
          );

        return storedUser
          ? JSON.parse(storedUser)
          : null;
      } catch (error) {
        console.error(
          "Stored user error:",
          error
        );

        localStorage.removeItem(
          "user"
        );

        return null;
      }
    });

  function login(data) {
    if (
      !data?.token ||
      !data?.user
    ) {
      throw new Error(
        "Invalid login response"
      );
    }

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        data.user
      )
    );

    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,

      isAdmin:
        user?.role === "admin",
    }),
    [user]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}