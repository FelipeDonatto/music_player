import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: '',
      loadSinger: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.fetchMusics(id);
  }

  fetchMusics = async (id) => {
    await getMusics(id).then((result) => this.setState({ album: result }));
    this.setState({ loadSinger: true });
  }

  render() {
    console.log();
    const { album, loadSinger } = this.state;
    const [albumCover, ...tracks] = album;
    return (
      <div data-testid="page-album">
        <Header />
        <div
          style={ {
            display: 'flex',
            flexFlow: 'wrap',
            width: '80%',
            margin: 'auto',
            marginTop: '20px' } }
        >
          {
            loadSinger
            && (
              <div
                style={ {
                  display: 'flex', flexFlow: 'column', alignItems: 'center' } }
              >
                <img
                  style={ {
                    height: '150px',
                    width: '150px',
                  } }
                  src={ albumCover.artworkUrl100 }
                  alt={ albumCover.collectionId }
                />
                <br />
                <h2 data-testid="album-name">
                  {' '}
                  {albumCover.collectionName}
                  {' '}
                </h2>
                <h4 data-testid="artist-name">
                  {' '}
                  {albumCover.artistName}
                  {' '}
                </h4>
              </div>)
          }
          <div
            style={ {
              display: 'flex', flexFlow: 'column wrap', marginLeft: '20px' } }
            className="musics"
          >
            {
              loadSinger && (tracks.map(
                (music) => <MusicCard { ...music } key={ music.trackId } />,
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}
Album.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
};
export default Album;
