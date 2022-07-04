import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favSong: false,
    };
  }

  // componentDidUpdate() {
  //   const { favSong } = this.state;
  //   const { trackId } = this.props;
  //   if (favSong) {
  //     this.saveSong(trackId);
  //   }
  // }

  loadingSwitch = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }));
  }

  render() {
    const {
      previewUrl,
      trackName,
      trackId,
    } = this.props;
    const { loading, favSong } = this.state;

    const saveSong = async (id) => {
      this.loadingSwitch();
      let music = '';
      await getMusics(id)
        .then(async (result) => { music = result[0].trackId; });
      await addSong(music);
      this.loadingSwitch();

      this.setState((prevState) => ({
        favSong: !prevState.favSong,
      }));
    };

    if (loading) return <Loading />;
    return (
      <>
        <div className="musicName">
          {' '}
          {trackName}
          {' '}
        </div>
        <div className="music">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label
            htmlFor={ trackId }
          >
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id={ trackId }
              checked={ favSong }
              onClick={ async () => saveSong(trackId) }
            />
            Favorita
          </label>
        </div>

      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};
export default MusicCard;
