import { ButtonHTMLAttributes, ReactElement } from 'react';
import './Button.css';

/**
 * Button with a bit of styling
 * @component
 */
const Button = (
  props: React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
): ReactElement => {
  return <button {...props} className={'button ' + props.className} />;
};

export default Button;
