import { View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import Message from './notif';

const genrateRandomNumber = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
                            messages.filter((currentMessage: string) => currentMessage !== message),
                        );
                    }}
                />
            ))}
        </View>
    );
};

export default DisplayMessages