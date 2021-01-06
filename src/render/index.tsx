import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';
import './less/index.less';

import { store } from './store';

ReactDOM.render(<App store={store} />, document.getElementById('main'));
