import React, { useState, createContext } from "react";

export const TgState = createContext();

export const ToogleProvider = (props) => {
  let data = {};
  const [Toogle, setToogle] = useState(false);
  const [BuyerData, setBuyerData] = useState(data);
  const [AlertToogle, setAlertToogle] = useState(false);
  const [Size, setSize] = useState("");
  return (
    <TgState.Provider
      value={{
        toogle: [Toogle, setToogle],
        buyer: [BuyerData, setBuyerData],
        alerttoogle: [AlertToogle, setAlertToogle],
        size: [Size, setSize],
      }}
    >
      {props.children}
    </TgState.Provider>
  );
};
