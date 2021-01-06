import { Store, Message } from './store';
import { log } from './util';

export function processMessage(message: Message, store: Store) {
  store.messages.push(message);
  if (message.type === 'connect') {
    document.body.style.backgroundColor = 'green';
  }
  store.update();
}
