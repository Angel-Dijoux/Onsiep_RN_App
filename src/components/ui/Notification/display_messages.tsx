import React, { useContext } from "react";
import { View } from "react-native";

import Message from "./notif";
import { AuthContext } from "../../../context/AuthContext";

const genrateRandomNumber = (min: number, max: number) => {
  const mini = Math.ceil(min);
  const maxi = Math.floor(max);
  return Math.floor(Math.random() * (maxi - mini + 1)) + mini;
};

const DisplayMessages = () => {
  const { setMessages, messages } = useContext(AuthContext);
  return (
    <View
      style={{
        position: "absolute",
        top: 45,
        left: 0,
        right: 0,
      }}
    >
      {messages.map((message: string) => (
        <Message
          key={genrateRandomNumber(1, 9000)}
          message={message}
          onHide={() => {
            setMessages((messages: string[]) =>
              messages.filter(
                (currentMessage: string) => currentMessage !== message
              )
            );
          }}
        />
      ))}
    </View>
  );
};

export default DisplayMessages;
