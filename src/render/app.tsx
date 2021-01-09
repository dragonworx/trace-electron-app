const electron = require('electron');
import * as React from 'react';
import { useState, useEffect } from 'react';
import { WithStore, Message } from './store';
import { processMessage } from './processMessage';
import { useInterval } from './hooks';
import { log } from './util';
import { Log } from './views/log';
import { TraceLinearView } from './views/trace-linear-view';

export function App(props: WithStore) {
  const { store } = props;
  const [, setUpdate] = useState(0);

  store.update = () => {
    setUpdate(Date.now());
  };

  useEffect(() => {
    electron.ipcRenderer.on('message', (_ws: any, message: Message) => {
      // a single message: { namespace: string, args: any[] }
      log('yellow', `message: ${JSON.stringify(message)}`);
      processMessage(message, store);
    });
  }, []);

  useInterval(() => store.update, 250);

  return (
    <ul id="app">
      <div id="body" onScroll={() => store.update()}>
        <TraceLinearView store={store} />
      </div>
    </ul>
  );
}
