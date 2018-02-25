import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components';
import registerServiceWorker from './registerServiceWorker';

import 'typeface-pacifico';
import 'typeface-arimo';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
