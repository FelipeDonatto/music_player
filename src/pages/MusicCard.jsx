import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
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
      favSongs,
    } = this.props;
    const { loading, favSong } = this.state;
    const favSongUpdater = favSongs;
    const saveSong = async (id) => {
      if (localStorage.getItem('favorite_songs').includes(id)) {
        this.loadingSwitch();
        let music = '';
        const firstInAr = [0];
        await getMusics(id)
          .then(async (result) => { music = result[firstInAr]; });
        await removeSong(music);
        this.setState((prevState) => ({
          favSong: !prevState.favSong,
        }));
        this.loadingSwitch();
      } else {
        this.loadingSwitch();
        let music = '';
        const firstInAr = [0];
        await getMusics(id)
          .then(async (result) => { music = result[firstInAr]; });
        this.setState((prevState) => ({
          favSong: !prevState.favSong,
        }));
        await addSong(music);
        this.loadingSwitch();
      }
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
              checked={ favSong || favSongUpdater.includes(trackId) }
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
  favSongs: PropTypes.string.isRequired,
};
export default MusicCard;
