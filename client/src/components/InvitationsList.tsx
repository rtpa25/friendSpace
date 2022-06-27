import { Close, Done } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setFriends } from '../store/slices/friends.slice';
import { setInvitations } from '../store/slices/invitations.slice';
import { User } from '../types/user';
import { axiosInstance } from '../utils/axios';
import Spinner from './Spinner';

const InvitationsList = () => {
  const invites = useAppSelector((state) => state.invitations.value);
  const friends = useAppSelector((state) => state.friends.value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchInvites = async () => {
      setIsLoading(true);
      try {
        const data = await axiosInstance.get('users/invites');
        dispatch(setInvitations({ value: data.data }));
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchInvites();
  }, [dispatch]);

  const invitationHandler = async (accept: boolean, invitation: User) => {
    try {
      const newInvites = invites.filter((invite) => {
        return invite.email !== invitation.email;
      });

      dispatch(setInvitations({ value: newInvites }));

      dispatch(setFriends({ value: [...friends, invitation] }));
      await axiosInstance.patch('/users/friend', {
        email: invitation.email,
        didAccept: accept,
      });
    } catch (error) {
      dispatch(setFriends({ value: [...friends] }));

      console.error(error);
    }
  };

  return (
    <InvitationsContainer>
      <InvitationHeaderHr />
      <InvitationSpan>Invitations</InvitationSpan>
      {isLoading ? (
        <Spinner />
      ) : (
        <InvitationListDiv>
          {invites.map((invitation: User) => {
            return (
              <InvitationElement key={invitation._id}>
                <InvitationAvatar
                  src={`https://ui-avatars.com/api/?background=5865f2&color=fff&name=${invitation.username}&font-size=0.3`}
                  alt={invitation.username}
                />
                <InvitationUserName>{invitation.username}</InvitationUserName>
                <InvitationIconsDiv
                  positive={true}
                  onClick={() => invitationHandler(true, invitation)}>
                  <Done />
                </InvitationIconsDiv>
                <InvitationIconsDiv
                  positive={false}
                  onClick={() => invitationHandler(false, invitation)}>
                  <Close />
                </InvitationIconsDiv>
              </InvitationElement>
            );
          })}
        </InvitationListDiv>
      )}
    </InvitationsContainer>
  );
};

const InvitationsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InvitationSpan = styled.span`
  font-family: sans-serif;
  color: white;
  font-size: medium;
`;

const InvitationListDiv = styled.div`
  width: 75%;
`;

const InvitationElement = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const InvitationAvatar = styled.img`
  border-radius: 50%;
  transform: scale(0.8);
  margin: 1rem 1rem 1rem 0;
`;

const InvitationUserName = styled.span`
  font-size: medium;
  color: white;
  font-family: sans-serif;
`;

const InvitationHeaderHr = styled.hr`
  width: 75%;
`;

const InvitationIconsDiv = styled.div<{ positive: boolean }>`
  color: ${(p) => (p.positive ? 'aqua' : 'red')};
  cursor: pointer;
  margin: 0 0.5rem;
`;

export default InvitationsList;
