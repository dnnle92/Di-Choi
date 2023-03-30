import { createContext, useEffect, useState } from "react";

interface CounterContextType {
  counter: number;
  initiateCounter(value: number): void;
  terminateCounter(vaule: number): void;
}

export const CounterContext = createContext<CounterContextType | null>(null);

const CounterProvider = ({ children }) => {
  const [counter, setCounter] = useState(Number);

  const initiateCounter = () => {
    setCounter(120);
  };
  const [flag, setFlag] = useState(true);
  const terminateCounter = () => {
    setCounter(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((currentTime) => {
        if (currentTime > 0) {
          return currentTime - 1;
        } else {
          clearInterval(interval);
          return currentTime;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);

  return (
    <CounterContext.Provider
      value={{
        counter,
        initiateCounter,
        terminateCounter,
      }}
    >
      {" "}
      {children}
    </CounterContext.Provider>
  );
};

export default CounterProvider;
