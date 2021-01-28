import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils.js';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className='sign-in'>
        <h2 className='title'>I already have an account</h2>
        <span>Sign in with email and password</span>
        <form onSubmit={this.handleSubmit} style={{ marginBottom: '1rem' }}>
          <FormInput
            handleChange={this.handleChange}
            name='email'
            type='email'
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            handleChange={this.handleChange}
            name='password'
            type='password'
            value={this.state.password}
            label='password'
            required
          />
          <CustomButton type='submit'>Sign In</CustomButton>
        </form>
        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
          Sign In With Google
        </CustomButton>
      </div>
    );
  }
}

export default SignIn;
