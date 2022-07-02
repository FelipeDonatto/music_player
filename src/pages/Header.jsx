import React from 'react';
import { Link } from 'react-router-dom';
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
    <header className="header" data-testid="header-component">
      <span data-testid="header-user-name">
        Olá,
        { ` ${userData.name}.` }
      </span>
      <nav>
        <Link data-testid="link-to-search" exact to="/search">Procurar</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </nav>
    </header>
  );
}
}

export default Header;
