import { LoadButton } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <LoadButton onClick={onClick} type="button">
      Show more
    </LoadButton>
  );
};

export default Button;
