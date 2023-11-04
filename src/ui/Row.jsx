import styled, { css } from 'styled-components';

const Row = styled.div`
  display: flex;
  ${({ type }) => {
    switch (type) {
      case 'horizontal':
        return css`
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `;
      case 'vertical':
        return css`
          flex-direction: column;
          gap: 1.6rem;
        `;
      default:
        return css`
          flex-direction: row;
          justify-content: space-between;
        `;
    }
  }}
`;

Row.defaultProps = {
  type: 'vertical',
};

export default Row;
