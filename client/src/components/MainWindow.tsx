import { Send } from '@material-ui/icons';
import styled from 'styled-components';
import { useAppSelector } from '../hooks/reduxHooks';

const MainWindowDiv = styled.div`
  background-color: #36393f;
  height: 100vh;
  flex: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MainWindow = () => {
  const { isOpen, user } = useAppSelector((state) => state.chat);
  return (
    <MainWindowDiv>
      {isOpen ? (
        <>
          <MainWindowHeader className='header'>
            <MainWindowHeaderSpan>
              Choosen Conversation: {user?.username}
            </MainWindowHeaderSpan>
            <MainWindowHeaderDivider />
            <MainWindowHeaderProfileInfo>
              <MainWindowHeaderAvatar
                src={`https://ui-avatars.com/api/?background=5865f2&color=fff&name=${user?.username}&font-size=0.3`}
                alt={user?.username}
              />
              <MainWindowHeaderUserName>
                {user?.username}
              </MainWindowHeaderUserName>
              <MainWindowHeaderSpan>
                This is the start of the direct messages with {user?.username}
              </MainWindowHeaderSpan>
            </MainWindowHeaderProfileInfo>
            <MainWindowHeaderDivider />
          </MainWindowHeader>
          <MainWindoBody className='mainBody'></MainWindoBody>
          <MainWindoMessageInput className='messageInput'>
            <MainWindoMessageInputBar type='text' />
            <Send
              style={{
                color: '#3fb161',
                position: 'absolute',
                zIndex: 1000,
                right: 40,
                bottom: 40,
              }}
            />
          </MainWindoMessageInput>
        </>
      ) : null}
    </MainWindowDiv>
  );
};

const MainWindowHeader = styled.div`
  text-align: center;
`;
const MainWindowHeaderSpan = styled.span`
  font-family: sans-serif;
  color: #3fb161;
  font-size: small;
  text-align: center;
`;
const MainWindowHeaderDivider = styled.hr`
  border-color: black;
  border-bottom: 0;
`;
const MainWindowHeaderProfileInfo = styled.div`
  text-align: left;
  margin: 2rem;
`;
const MainWindowHeaderAvatar = styled.img`
  border-radius: 50%;
`;
const MainWindowHeaderUserName = styled.h3`
  font-family: sans-serif;
  color: white;
  font-size: x-large;
`;
const MainWindoBody = styled.div``;
const MainWindoMessageInput = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;
`;
const MainWindoMessageInputBar = styled.input`
  width: 100%;
  height: 2rem;
  background-color: #202225;
  color: white;
  border: none;
  border-radius: 0.4rem;
  padding: 0.3rem;
`;

export default MainWindow;
