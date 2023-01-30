import {useState, useEffect} from 'react';
import styled from 'styled-components';

import socket from '../../core/socket';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Message = styled.div`
  margin: 0;
  padding: 10px 15px;
  max-width: 300px;
  width: 100%;
  color: #fff;
  margin-left: ${({isYou}) => !isYou ? '0' : 'auto'};
  background-color: ${({ isYou }) => !isYou ? "#357DED" : "#84BCDA"};
  font-size: 16px;
  border-radius: 10px;

  span {
    font-weight: bold;
  }
`;

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (data) => setMessages([...messages, data]));

    socket.on('SUCCESS:MESSAGE', (data) => setMessages(
        [...messages, {login: 'Вы', message: data.message, isYou: true}]));
  }, [socket, messages]);

  return <Container>
    {messages.map((message, key) => <Message isYou={message.isYou}>
      <span>{message.login}: </span>
      {message.message}
    </Message>)}
  </Container>;
};

export default Messages;