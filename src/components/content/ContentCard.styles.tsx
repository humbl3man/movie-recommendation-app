import styled from 'styled-components';

export const StyledCard = styled.article<{ hasImage: boolean }>`
  position: relative;
  z-index: 1;
  padding: 0.8rem;
  background: rgba(32, 40, 62, 0.8);
  border-radius: 12px;
  height: 100%;
  transition: background 500ms ease;
  ${(props) =>
    props.hasImage
      ? `
  
    &:hover img {
      transform: scale(1.02);
    }

  `
      : ''}
  &:hover {
    background: var(--grey700);
  }
`;

export const StyledCardImageContainer = styled.div`
  overflow: hidden;
  border-radius: 8px;

  img {
    max-width: 400px;
    width: 100%;
    height: auto;
    display: block;
    transition: transform 1s ease;
  }
`;

export const StyledCardBody = styled.section`
  p {
    color: var(--grey50);
    padding-left: 0.8rem;
    margin-top: 2.4rem;
  }
`;

export const StyledRating = styled.div`
  background-color: var(--black65);
  color: var(--warning500);
  left: 16px;
  top: 28px;
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
  p {
    margin: 0 0 0 0.4rem;
    font-size: 1.5rem;
    color: var(--warning500);
  }
  @media screen and (min-width: 767px) {
    top: 18px;
    padding: 0.8rem 1.2rem;
    p {
      font-size: 1.6rem;
    }
  }
`;

export const StyledWatchlistButtonContainer = styled.div`
  position: absolute;
  z-index: 100;
  top: -16px;
  right: -6px;
`;

export const StyledWatchlistButton = styled.button`
  appearance: none;
  background: transparent;
  border: 0;
  color: var(--primary100);
  cursor: pointer;
  padding: 0;
  &:hover {
    color: var(--primary300);
  }
  &:disabled {
    opacity: 0.6;
  }
`;
