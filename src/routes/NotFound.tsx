import styled from 'styled-components';
import notFoundImage from '../assets/404.svg';
import { ButtonLink } from '../components/common/Button.component';

const StyledPage = styled.main`
  margin-top: 4rem;
  text-align: center;
  img {
    max-width: 580px;
    width: 100%;
    height: auto;
    margin-bottom: 4rem;
    h1 {
      margin-top: 0;
    }
    p {
      margin-top: 0;
    }
  }
`;

const NotFound = () => {
  return (
    <StyledPage>
      <img src={notFoundImage} width="1121" height="778" alt="404" />
      <h1 className="h2">Lost your way?</h1>
      <p>Oops! This is awkward. You are looking for something that doesn't actually exist.</p>
      <ButtonLink
        to="/"
        style={{
          marginTop: '2.4rem'
        }}>
        Go Home
      </ButtonLink>
    </StyledPage>
  );
};

export default NotFound;
