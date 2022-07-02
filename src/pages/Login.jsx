import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disableBtn: true,
      inputValue: '',
      loading: false,
    };
  }

  loadingSwitch = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }));
  }

  loadingFunc = async () => {
    const { inputValue } = this.state;
    const { history } = this.props;
    this.loadingSwitch();
    await createUser({ name: inputValue });
    this.loadingSwitch();
    history.push('/search');
  }

  // https://stackoverflow.com/questions/61128406/redirect-happens-before-onclick-on-react-link
  // feito com ajuda deste post no stackoverflow ↑

  render() {
    const { disableBtn, loading } = this.state;
    const btnCondition = 3;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login">
        <input
          onChange={ ({ target }) => this.setState({
            inputValue: target.value,
            disableBtn: target.value.length < btnCondition,
          }) }
          data-testid="login-name-input"
          type="text"
          name=""
          id=""
        />
        <button
          disabled={ disableBtn }
          data-testid="login-submit-button"
          type="button"
          onClick={ () => this.loadingFunc() }
        >
          Entrar

        </button>
      </div>);
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
