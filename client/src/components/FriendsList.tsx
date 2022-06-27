import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setFriends } from '../store/slices/friends.slice';
import { User } from '../types/user';
import { axiosInstance } from '../utils/axios';
import AddFriendRequestModal from './AddFriendRequestModal/AddFriendRequestModal';
import Spinner from './Spinner';

const FriendsList = () => {
  const [showAddInvitationModal, setShowAddInvitationModal] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const friends = useAppSelector((state) => state.friends.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAllFriends = async () => {
      setIsLoading(true);
      try {
        const data = await axiosInstance.get('users/friends');
        dispatch(setFriends({ value: data.data }));
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchAllFriends();
  }, [dispatch]);

  return (
    <FriendsContainer>
      <AddFriendButton onClick={() => setShowAddInvitationModal(true)}>
        Add Friend
      </AddFriendButton>
      <AddFriendRequestModal
        show={showAddInvitationModal}
        closeHandler={() => {
          setShowAddInvitationModal(false);
        }}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <ChatListDiv>
          {friends.map((friend: User) => {
            return (
              <ChatElement key={friend._id}>
                <ChatAvatar
                  src={`https://ui-avatars.com/api/?background=5865f2&color=fff&name=${friend.username}&font-size=0.3`}
                  alt={friend.username}
                />
                <ChatUserName>{friend.username}</ChatUserName>
              </ChatElement>
            );
          })}
        </ChatListDiv>
      )}
    </FriendsContainer>
  );
};

const FriendsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddFriendButton = styled.button`
  background-color: #215c33;
  color: white;
  height: 3rem;
  width: 75%;
  margin: 1rem;
  border-radius: 0.5rem;
  font-size: medium;
  transition: all ease-out 0.2s;
  :hover {
    transform: scale(1.02);
    background-color: #3ba55d;
  }
`;

const ChatListDiv = styled.div`
  width: 75%;
`;

const ChatElement = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ChatAvatar = styled.img`
  border-radius: 50%;
  transform: scale(0.8);
  margin: 1rem 1rem 1rem 0;
`;

const ChatUserName = styled.span`
  font-size: medium;
  color: white;
  font-family: sans-serif;
`;

export default FriendsList;
