import { Store, Message } from './store';
import { log } from './util';

export function processMessage(message: Message, store: Store) {
  const { messages, clients } = store;
  const { id, type } = message;

  messages.add(message);

  clients.add(id);

  // handle message type
  if (type === 'connect') {
  } else if (type === 'dissconnect') {
    clients.delete(id);
  } else if (type === 'message') {
  }

  store.update();
}
