import { useState, useCallback } from 'react';
import AlertContext from './alert-context';
import { Alert, Snackbar } from '@mui/material';

export default function AlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const setAlert = useCallback(
    (alertMessage: string, error: boolean = false) => {
      setMessage(alertMessage);
      setIsError(error);
      setToastOpen(true);
    },
    [],
  );

  return (
    <AlertContext.Provider value={{ setAlert }}>
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
    </AlertContext.Provider>
  );
}
