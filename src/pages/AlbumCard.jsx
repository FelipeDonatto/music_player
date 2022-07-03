import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const {
    //   artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      //   releaseDate,
      trackCount,
    } = this.props;
    return (
      <div className="card">
        <Link
          to={ `album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ artistName } srcSet="" />
        </Link>
        {/* <p> {artistId} </p> */}
        <h2>
          {' '}
          {artistName}
          {' '}
        </h2>
        {/* <p> {collectionId} </p> */}
        <h4>
          {' '}
          {collectionName}
          {' '}
        </h4>
        <p>
          Preço:
          {' '}
          {collectionPrice}
          {' '}
          $
        </p>
        {/* <p> {releaseDate} </p> */}
        <p>
          {' '}
          {trackCount}
          {' '}
          tracks
        </p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  collectionPrice: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  trackCount: PropTypes.string.isRequired,
};
export default AlbumCard;
