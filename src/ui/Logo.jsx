import styled from 'styled-components';
import { useDarkMode } from '../features/context/DarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <StyledLogo>
      {isDarkMode ? (
        <Img src='/logo-dark.png' alt='Dark Mode Logo' />
      ) : (
        <Img src='/logo-light.png' alt='Light Mode Logo' />
      )}
    </StyledLogo>
  );
}

export default Logo;
