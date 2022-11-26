import { ReactElement, ReactNode } from 'react';
import './background.css';

type Props = {
  children: ReactNode;
};

const Background = ({ children }: Props): ReactElement => {
  return <div className="background">{children}</div>;
};

export default Background;
