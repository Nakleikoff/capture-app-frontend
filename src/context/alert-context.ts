import { createContext, useContext } from 'react';

interface AlertContext {
  setAlert: (alertMessage: string, error?: boolean) => void;
}

const AlertContext = createContext<AlertContext>({
  setAlert: () => {},
});

export const useAlert = () => useContext(AlertContext);

export default AlertContext;
