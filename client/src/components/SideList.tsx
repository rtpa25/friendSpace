import styled from 'styled-components';
import FriendsList from './FriendsList';
import InvitationsList from './InvitationsList';

const SideList = () => {
  return (
    <SideListContainer>
      <FriendsList />
      <InvitationsList />
    </SideListContainer>
  );
};

const SideListContainer = styled.div`
  background-color: #2f3136;
  flex: 3;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  ::-webkit-scrollbar {
    color: black;
    width: 1px;
  }
`;

export default SideList;
