import { createContext, ReactNode, useContext, useState } from "react";

type SignInContextType = {
  isSignIn: boolean;
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: boolean = true;

const SignInContext = createContext<SignInContextType>({
  isSignIn: initialState,
  setIsSignIn: () => {},
});

function SignInProvider({ children }: { children: ReactNode }) {
  const [isSignIn, setIsSignIn] = useState(initialState);

  return (
    <SignInContext.Provider value={{ isSignIn, setIsSignIn }}>
      {children}
    </SignInContext.Provider>
  );
}

function useSignInContext() {
  const context = useContext(SignInContext);

  if (context === undefined)
    throw new Error("Context was used outside its provider");
  return context;
}

export { SignInProvider, useSignInContext };
