import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.main`
  background-color: orangered;
  padding: 1.5rem;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>

        <Button onClick={() => alert('Check In')}>Check In</Button>
        <Button onClick={() => alert('Check Out')}>Check Out</Button>

        <Input
          type='number'
          placeholder='Number of guests'
        />
        <Input
          type='number'
          placeholder='Number of guests'
        />
      </StyledApp>
    </>
  );
}

export default App;

