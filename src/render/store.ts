// import { ClassyCollection } from './ClassyCollection';

export interface Message {
  id: string;
  sentAt: number;
  type: 'flush' | 'connect' | 'dissconnect' | 'message';
  data: any[];
}

export interface Store {
  messages: Message[];
  clients: Set<string>;
  update: () => void;
  toString: () => string;
}

export interface WithStore {
  store: Store;
}

// default store ...
export const store: Store = {
  messages: [],
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
