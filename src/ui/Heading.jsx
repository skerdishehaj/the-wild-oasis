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
          background-color: var(--color-grey-800);
        `;
      case 'h2':
        return css`
          font-size: 2rem;
          font-weight: 500;
          background-color: var(--color-grey-400);
        `;
      case 'h3':
        return css`
          font-size: 1.5rem;
          font-weight: 400;
          background-color: var(--color-grey-100);
        `;
      default:
        return css`
          font-size: 1rem;
          font-weight: 300;
          background-color: var(--color-grey-0);
        `;
    }
  }}
`;
export default Heading;
