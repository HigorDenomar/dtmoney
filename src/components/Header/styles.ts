import styled from 'styled-components';

export const Container = styled.header`
  background: var(--blue);
`;

export const Content = styled.div`
  max-width: 1128px;
  margin: 0 auto;

  padding: 3.2rem 1.6rem 19rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 1.6rem;
    color: #FFF;
    background: var(--blue-light);
    border: 0;
    padding: 0 3.2rem;
    border-radius: 0.4rem;
    height: 4.8rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
