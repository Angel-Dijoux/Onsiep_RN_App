import { Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from './../../../context/AuthContext';
import Message from './notif';

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
            {messages.map((message) => (
                <Message
                    key={message}
                    message={message}
                    onHide={() => {
                        setMessages((messages) =>
                            messages.filter((currentMessage) => currentMessage !== message)
                        );
                    }}
                />
            ))}
        </View>
    );
};

export default DisplayMessages