import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ email: '', password: '' });
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with email and password</span>
        <form onSubmit={this.handleSubmit}>
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
      </div>
    );
  }
}

export default SignIn;
