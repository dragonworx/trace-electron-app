import * as React from 'react';
import { useEffect } from 'react';
import { WithStore } from '../store';
import { getTime, isFullScroll } from '../util';

export function TraceLinearView(props: WithStore) {
  const { store } = props;
  const { messages, clients } = store;

  const scrollIfNeeded = () => {
    const body = document.getElementById('body') as HTMLTableElement;
    const log = document.getElementById('log') as HTMLTableElement;
    const lastRow = log.rows[log.rows.length - 1];
    lastRow.scrollIntoView();
  };

  useEffect(scrollIfNeeded);

  return (
    <table id="log">
      <thead>
        <tr>
          <th>type</th>
          <th>data</th>
          <th>sentAt</th>
          <th>id ({clients.size})</th>
        </tr>
      </thead>
      <tbody>
        {messages.getSegment('trace').map((message, i) => {
          const { hours, minutes, seconds, milliseconds } = getTime(
            message.sentAt,
          );
          return (
            <tr key={i}>
              <td className={`type ${message.type}`}>{message.type}</td>
              <td className={`data ${message.type}`}>
                {JSON.stringify(message.data)}
              </td>
              <td
                className={`sentAt ${message.type}`}
              >{`${hours}:${minutes}:${seconds}:${milliseconds}`}</td>
              <td className={`id ${message.type}`}>{message.id}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
