import { Store, Message } from './store';
import { NS } from './namespace';
import { log } from './util';

export function processMessage(message: Message, store: Store) {
  const { messages, clients } = store;
  const { id, type, data } = message;

  messages.add(message);

  clients.add(id);

  // handle message type
  if (type === 'connect') {
  } else if (type === 'dissconnect') {
    clients.delete(id);
  } else if (type === 'trace') {
    const { namespace, args } = data;
    NS.resolve(namespace).addMessage(message);
  }

  store.update();
}
