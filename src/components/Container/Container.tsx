import { FC } from 'react';
import styles from './Container.module.scss';

interface IContainer {
  children: JSX.Element | React.ReactNode;
}

const Container: FC<IContainer> = ({children}) => {
    return <section className={ styles.container }>
        {children}
    </section>
}

export default Container;