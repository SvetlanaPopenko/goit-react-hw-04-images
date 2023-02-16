import { RotatingLines } from 'react-loader-spinner';
import { createPortal } from 'react-dom';
import { Loading } from './Loader.styled';

const Spiner = document.querySelector('#loader');

const Loader = () => {
  return createPortal(
    <Loading>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </Loading>,
    Spiner
  );
};
export default Loader;
