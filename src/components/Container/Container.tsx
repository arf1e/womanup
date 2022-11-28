import { ReactElement, ReactNode } from 'react';
import './Container.css';

type Props = {
  children: ReactNode;
};

/**
 * Form container
 * @component
 */
const Container = ({ children }: Props): ReactElement => {
  return <div className="form-container">{children}</div>;
};

export default Container;
