import styled, { css } from 'styled-components';

/* const test = css`
  text-align: center;
  ${10 > 5 && 'background-color: yellow;'}
`; */

const Heading = styled.h1`
  ${({ as }) => {
    switch (as) {
      case 'h1':
        return css`
          font-size: 3rem;
          font-weight: 600;
        `;
      case 'h2':
        return css`
          font-size: 2rem;
          font-weight: 500;
        `;
      case 'h3':
        return css`
          font-size: 1.5rem;
          font-weight: 400;
        `;
      default:
        return css`
          font-size: 1rem;
          font-weight: 300;
        `;
    }
  }}
`;
export default Heading;
