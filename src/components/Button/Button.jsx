import PropTypes from 'prop-types';

const ButtonLoadMore = ({ onClick }) => (
  <button type="button" className="Button" onClick={onClick}>
    Load more
  </button>
);
ButtonLoadMore.propTypes = {
  onClick: PropTypes.func,
};

export default ButtonLoadMore;
