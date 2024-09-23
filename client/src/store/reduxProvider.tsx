'use client';

import { Provider } from 'react-redux';
import { store } from './store';

export const ReduxProvider = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <Provider store={store}>{children}</Provider>;
};
