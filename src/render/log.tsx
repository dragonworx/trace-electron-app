import * as React from 'react';
import { WithStore } from './store';
import { getTime } from './util';

export function Log(props: WithStore) {
  const { store } = props;
  const { messages } = store;

  return (
    <table id="log">
      <thead>
        <tr>
          <th>type</th>
          <th>data</th>
          <th>sentAt</th>
          <th>id</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message, i) => {
          const { hours, minutes, seconds, milliseconds } = getTime(
            message.sentAt,
          );
          return (
            <tr key={i}>
              <td className={`type ${message.type}`}>{message.type}</td>
              <td className="data">{JSON.stringify(message.data)}</td>
              <td className="sentAt">{`${hours}:${minutes}:${seconds}:${milliseconds}`}</td>
              <td className="id">{message.id}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
