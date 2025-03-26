import { createContext, useContext } from "react";
import { useState } from "react";
import MySnackbar from "../components/MySnackBar";
let SnackContext = createContext();

export const SnackProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState({
    messageText: "any",
    messageType: "success",
  });

  function showHideToast(text, type) {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    setMessageInfo({ ...messageInfo, messageText: text, messageType: type });
  }
  return (
    <SnackContext.Provider value={showHideToast}>
      <MySnackbar
        open={open}
        text={messageInfo.messageText}
        type={messageInfo.messageType}
      />
      {children}
    </SnackContext.Provider>
  );
};
export let useSnack = () => useContext(SnackContext);
