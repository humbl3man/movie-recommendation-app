import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import AuthContext from '../auth/authProvider';
import loginSplashSrc from '../assets/login-splash-image.png';
import emailIcon from '../assets/email.svg';
import passIcon from '../assets/password.svg';
import { Link } from 'react-router-dom';

const StyledContainer = styled.section`
  display: grid;

  @media screen and (min-width: 767px) {
    grid-template-columns: minmax(300px, 1fr) 1fr;
    grid-gap: 12.6rem;
  }
`;

const StyledFormContainer = styled.div`
  display: flex;
  align-items: center;
  @media screen and (min-width: 767px) {
    padding-right: 4.2rem;
  }

  form {
    width: 100%;
  }
  .field input {
    display: block;
    width: 100%;
  }
`;

const StyledSplashImage = styled.div`
  display: none;
  @media screen and (min-width: 767px) {
    display: block;
    img {
      display: block;
      max-width: 100%;
      height: auto;
    }
  }
`;

const StyledAuthError = styled.div`
  background: var(--error500);
  color: var(--white);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const StyledFooterMessage = styled.div`
  margin-top: 2rem;
`;

type FormInputs = {
  email: string;
  password: string;
};

const emailRgx = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gm;

const Account: React.FC<{ type: 'create' | 'login' }> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (user) => {
    if (props.type === 'login') {
      signIn(user);
    } else {
      createUser(user);
    }
  };
  const [emailValue, passwordValue] = watch(['email', 'password']);
  const { signIn, createUser, authUser, authError } = useContext(AuthContext);

  if (authUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <StyledContainer>
      <StyledSplashImage>
        <img src={loginSplashSrc} width={486} height={584} alt="" />
      </StyledSplashImage>
      <StyledFormContainer>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1>{props.type === 'login' ? 'Login' : 'Create Account'}</h1>
          {authError && <StyledAuthError>{authError}</StyledAuthError>}

          <div className="field field--withIcon">
            <label htmlFor="email" className={`${emailValue ? 'raised' : ''}`}>
              Email
            </label>
            <div className="field-icon">
              <img src={emailIcon} alt="" />
            </div>
            <input
              id="email"
              type="email"
              className={errors?.email?.message ? 'error' : ''}
              {...register('email', {
                required: 'Please enter email address',
                pattern: {
                  value: emailRgx,
                  message: 'Please enter valid email address'
                }
              })}
            />
            {errors.email?.message && <div className="field-error">{errors.email.message}</div>}
          </div>
          <div className="field field--withIcon">
            <label htmlFor="password" className={`${passwordValue ? 'raised' : ''}`}>
              Password
            </label>
            <div className="field-icon">
              <img src={passIcon} alt="" />
            </div>
            <input
              id="password"
              type="password"
              className={errors?.password?.message ? 'error' : ''}
              {...register('password', {
                required: 'Please enter password',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
            {errors.password?.message && <div className="field-error">{errors.password.message}</div>}
          </div>
          <button className="btn">{props.type === 'login' ? 'Login' : 'Create Account'}</button>
          <StyledFooterMessage>
            {props.type === 'login' ? (
              <p>
                Don't have an account? <Link to="/create-account">Sign Up</Link>
              </p>
            ) : (
              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            )}
            <p>
              Forgot your password? <Link to="/reset-password">Reset</Link>
            </p>
          </StyledFooterMessage>
        </form>
      </StyledFormContainer>
    </StyledContainer>
  );
};

export default Account;