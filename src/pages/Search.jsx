import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from './AlbumCard';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disableBtn: true,
      searchData: [],
      btnClick: false,
      inputValue: '',
    };
  }

  componentDidUpdate() {

  }

  searchFunc = async ({ target }) => {
    const { value } = target.previousElementSibling;
    this.setState({
      inputValue: value,
    });
    await searchAlbumsAPI(value).then((result) => this.setState({ searchData: result }));
    target.previousElementSibling.value = '';
  }

  render() {
    const btnCondition = 2;
    const { disableBtn, searchData, btnClick, inputValue } = this.state;
    const conditionals = searchData.length !== 0 && btnClick !== false;
    console.log(conditionals);
    const resultP = (
      <p>
        Resultado de álbuns de:
        {' '}
        { inputValue }
      </p>);

    return (
      <div className="search" data-testid="page-search">
        <Header />
        <input
          className="searchBar"
          onChange={ ({ target }) => this.setState({
            disableBtn: target.value.length < btnCondition,
          }) }
          type="text"
          data-testid="search-artist-input"
          name=""
          id=""
        />
        <button
          disabled={ disableBtn }
          type="button"
          data-testid="search-artist-button"
          onClick={ async (event) => {
            await this.searchFunc(event);
            this.setState({
              btnClick: true,
            });
          } }
        >
          Procurar
        </button>
        {
          conditionals && resultP
        }
        {
          conditionals && searchData
            .map((element) => <AlbumCard { ...element } key={ element.collectionId } />)
        }
        {
          (btnClick === true && searchData.length === 0)
          && <p>Nenhum álbum foi encontrado</p>
        }
      </div>
    );
  }
}

export default Search;
