import { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { axiosInstance } from '../../utils/axios';
import './AddFriendRequestModal.css';

interface AddFriendRequestModalProps {
  show: boolean;
  closeHandler: () => void;
}

const AddFriendRequestModal: FC<AddFriendRequestModalProps> = ({
  show,
  closeHandler,
}) => {
  const [invitationEmail, setInvitationEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setIsError] = useState<boolean>(false);

  const addInvitationHandler = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.patch('/users/invite', {
        invitedUserEmail: invitationEmail,
      });
      closeHandler();
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return ReactDOM.createPortal(
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <Modal onClick={closeHandler} className='modal'>
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          className='modal-content'>
          <ModalHeader>
            <ModalTitle>Add Friend Request</ModalTitle>
            <ModalHeaderSpan>
              The user needs to have an account on FriendSpace and once he/she
              accepts your request you can have private chats and video calls
            </ModalHeaderSpan>
          </ModalHeader>
          <hr
            style={{
              width: '30%',
              color: 'green',
              marginBottom: '2rem',
            }}
          />
          <ModalBodyEmailInput
            type='email'
            value={invitationEmail}
            onChange={(e) => setInvitationEmail(e.target.value)}
          />
          <ModalFooterButton onClick={addInvitationHandler}>
            {isLoading ? 'Adding...' : 'Add Friend'}
          </ModalFooterButton>
          {error ? (
            <span style={{ color: 'red', fontFamily: 'sans-serif' }}>
              Something went wrong
            </span>
          ) : null}
        </ModalContent>
      </Modal>
    </CSSTransition>,
    document.getElementById('root') as HTMLElement
  );
};

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  width: 30%;
  background-color: #36393f;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ModalHeader = styled.div`
  font-family: sans-serif;
  color: white;
  text-align: center;
  margin: 1rem;
`;

const ModalTitle = styled.h3`
  font-size: x-large;
`;

const ModalHeaderSpan = styled.span`
  font-size: small;
  color: #b5b6b8;
`;

const ModalBodyEmailInput = styled.input`
  background-color: #202225;
  color: white;
  border: none;
  height: 1.5rem;
  border-radius: 0.5rem;
  width: 60%;
  padding: 0.3rem;
`;

const ModalFooterButton = styled.button`
  background-color: #215c33;
  color: white;
  height: 3rem;
  width: 35%;
  margin: 1rem;
  border-radius: 0.5rem;
  font-size: medium;
  transition: all ease-out 0.2s;
  :hover {
    transform: scale(1.02);
    background-color: #3ba55d;
  }
`;

export default AddFriendRequestModal;
