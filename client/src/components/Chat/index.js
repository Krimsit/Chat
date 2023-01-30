import {Card as BaseCard} from 'antd';
import styled from 'styled-components';
import {Messages, SendMessage} from '../index';

const Card = styled(BaseCard)`
  max-width: 500px;
  width: 100%;
  border-radius: 25px;

  .ant-card-body {
    overflow-y: auto;
    max-height: 400px;
    height: 400px;
    gap: 25px;
  }
`;

const Chat = () => {
  return <Card title="Чат" actions={[
    <SendMessage/>,
  ]}>
    <Messages/>
  </Card>;
};

export default Chat