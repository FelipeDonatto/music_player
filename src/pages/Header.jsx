import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userData: {},
    };
  }

  componentDidMount() {
    this.loadingUser();
  }

  loadingSwitch = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }));
  }

loadingUser = async () => {
  this.loadingSwitch();
  await getUser().then((result) => this.setState({ userData: result }));
  this.loadingSwitch();
};

render() {
  const { loading, userData } = this.state;
  if (loading) return <Loading />;
  return (
    <header data-testid="header-component">
      <span data-testid="header-user-name">
        Olá,
        { ` ${userData.name}` }
      </span>
    </header>
  );
}
}

export default Header;
