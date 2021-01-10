import * as React from 'react';
import { useEffect } from 'react';
import { WithStore, TraceMessage } from '../store';
import { getTime, isFullScroll } from '../util';

export function TraceLinearView(props: WithStore) {
  const { store } = props;
  const { messages, clients } = store;

  const scrollIfNeeded = () => {
    const table = document.getElementById(
      'trace-linear-view',
    ) as HTMLTableElement;
    const lastRow = table.rows[table.rows.length - 1];
    lastRow.scrollIntoView();
  };

  useEffect(scrollIfNeeded);

  return (
    <table id="trace-linear-view">
      <thead>
        <tr>
          <th>sendAt</th>
          <th>namespace</th>
          <th>args</th>
        </tr>
      </thead>
      <tbody>
        {messages.getSegment('trace').map((message, i) => {
          const { namespace, args } = (message.data as unknown) as TraceMessage;
          const { hours, minutes, seconds, milliseconds } = getTime(
            message.sentAt,
          );
          return (
            <tr key={i}>
              <td
                className={`sentAt`}
              >{`${hours}:${minutes}:${seconds}:${milliseconds}`}</td>
              <td className={`namespace`}>{namespace}</td>
              <td className={`args`}>{JSON.stringify(args)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
