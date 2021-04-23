import { ClassifiedCollection } from './ClassifiedCollection';

export interface Message {
  id: string;
  sentAt: number;
  type: 'flush' | 'connect' | 'dissconnect' | 'trace';
  data: any;
  _isFirstForNS: boolean;
}

export interface TraceMessage {
  namespace: string;
  args: any[];
}

export interface Store {
  messages: ClassifiedCollection<Message>;
  clients: Set<string>;
  update: () => void;
  toString: () => string;
}

export interface WithStore {
  store: Store;
}

export const classifyByMessageType = (message: Message) => message.type;

// default store ...
export const store: Store = {
  messages: new ClassifiedCollection([classifyByMessageType]),
  clients: new Set(),
  update() {
    return void 0;
  },
  toString() {
    return `todo serialised...`;
  },
};

/**
 * TODO: Testing with Jest:
 * + Captures can be recorded in realtime by instrumenting to app from client(s) using capture UX
 * + Captures can be serliased to string and saved in repo/project as static test resources
 * + Resources can be compared to current capture from Jest side, snapshots compared
 */
