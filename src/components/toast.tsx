import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => useContext(ToastContext)!;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState(false);

  const showToast = (msg: string) => {
    setMessage(msg);
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
        <Alert severity="success" variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};