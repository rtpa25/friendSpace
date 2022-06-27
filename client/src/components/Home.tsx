import styled from 'styled-components';
import SideList from './SideList';
import MainWindow from './MainWindow';
import SideBar from './SideBar';

const HomeDiv = styled.div`
  display: flex;
`;

const Home = () => {
  return (
    <HomeDiv>
      <SideBar></SideBar>
      <SideList></SideList>
      <MainWindow></MainWindow>
    </HomeDiv>
  );
};

export default Home;
