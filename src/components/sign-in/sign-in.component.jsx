import { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.actions';
import './sign-in.styles.scss';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userCredentials;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    emailSignInStart(email, password);
  };
  return (
    <div className='sign-in'>
      <h2 className='title'>I already have an account</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <FormInput
          handleChange={handleChange}
          name='email'
          type='email'
          value={email}
          label='email'
          required
        />
        <FormInput
          handleChange={handleChange}
          name='password'
          type='password'
          value={password}
          label='password'
          required
        />
        <CustomButton type='submit'>Sign In</CustomButton>
      </form>
      <CustomButton onClick={googleSignInStart} isGoogleSignIn>
        Sign In With Google
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
