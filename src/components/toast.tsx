import { createContext, useContext, useState } from "react";
import { Snackbar, Alert, type AlertColor } from "@mui/material";

type ToastContextType = {
  showToast: (message: string, severity: AlertColor) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => useContext(ToastContext)!;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showToast = (msg: string, severity: AlertColor) => {
    setMessage(msg);
    severity && setSeverity(severity);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};