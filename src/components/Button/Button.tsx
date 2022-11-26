import { ButtonHTMLAttributes, ReactElement } from 'react';
import './Button.css';

const Button = (
  props: React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
): ReactElement => {
  return <button {...props} className={'button ' + props.className} />;
};

export default Button;
