import { PowerSettingsNew } from '@material-ui/icons';
import { useState } from 'react';
import styled from 'styled-components';
import { signOut } from 'supertokens-auth-react/recipe/emailpassword';
import Spinner from './Spinner';

const SideBar = () => {
  const [isLoading, setisLoading] = useState(false);
  const logoutHandler = async () => {
    setisLoading(true);
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('SuperTokens Error', error);
    }
    setisLoading(false);
  };
  return (
    <SideBarDiv>
      <VideoChatRoomIconContainer>
        <VideoChatRoomIcon>dsa</VideoChatRoomIcon>
        <VideoChatRoomIcon>sda</VideoChatRoomIcon>
        <VideoChatRoomIcon>asd</VideoChatRoomIcon>
      </VideoChatRoomIconContainer>
      <UserControllesContainer>
        <UserControllerButtons>add</UserControllerButtons>
        <UserControllerButtons onClick={logoutHandler}>
          {isLoading ? <Spinner /> : <PowerSettingsNew />}
        </UserControllerButtons>
      </UserControllesContainer>
    </SideBarDiv>
  );
};

const SideBarDiv = styled.div`
  background-color: #202225;
  flex: 0.8;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const VideoChatRoomIcon = styled.button`
  background-color: #5865f2;
  margin: 0.7rem;
  border-radius: 25%;
  height: 4rem;
  color: white;
  transition: all ease-out 0.2s;
  :hover {
    background-color: transparent;
    border-color: #5865f2;
    border-style: solid;
    color: #5865f2;
    transform: scale(1.1);
  }
`;

const VideoChatRoomIconContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserControllesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserControllerButtons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2f3136;
  margin: 0.7rem;
  border-radius: 50%;
  height: 4rem;
  color: #3ba55d;
  transition: all ease-out 0.2s;
  :hover {
    background-color: #3ba55d;
    color: white;
    transform: scale(1.1);
  }
`;

export default SideBar;
