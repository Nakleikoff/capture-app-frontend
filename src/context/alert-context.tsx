import { Alert, Snackbar } from '@mui/material';
import { createContext, useContext, useState } from 'react';

interface AlertContext {
  setAlert: (alertMessage: string, error?: boolean) => void;
}

const AlertContext = createContext<AlertContext>({
  setAlert: () => {},
});

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const setAlert = (alertMessage: string, error: boolean = false) => {
    setMessage(alertMessage);
    setIsError(error);
    setToastOpen(true);
  };

  return (
    <AlertContext value={{ setAlert }}>
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity={isError ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </AlertContext>
  );
};

export const useAlert = () => useContext(AlertContext);

export default AlertContext;
