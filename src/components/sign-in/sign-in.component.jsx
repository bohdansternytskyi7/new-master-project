import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.actions';
import './sign-in.styles.scss';

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
    const { emailSignInStart } = this.props;
    emailSignInStart(email, password);
  };

  render() {
    const { googleSignInStart } = this.props;

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
        <CustomButton onClick={googleSignInStart} isGoogleSignIn>
          Sign In With Google
        </CustomButton>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
