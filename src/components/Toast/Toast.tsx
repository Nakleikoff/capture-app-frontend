import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

interface ToastProps {
  message: string;
  error?: boolean;
}
export default function Toast({ message, error = false }: ToastProps) {
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <Snackbar
      open={toastOpen}
      autoHideDuration={3000}
      onClose={() => setToastOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={() => setToastOpen}
        severity={error ? 'error' : 'success'}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
