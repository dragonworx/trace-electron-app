import { Message } from './store';
import { log } from './util';

class NS {
  id: number;
  name: string;
  domainName: string;
  messages: Message[] = [];
  parent?: NS;
  children: NS[] = [];

  static id: number = 0;
  static registry: Map<string, NS> = new Map();
  static root: NS = new NS('root');

  static newId() {
    return NS.id++;
  }

  static resolve(namespace: string): NS {
    const existingNamespace = NS.registry.get(namespace);
    if (existingNamespace) {
      return existingNamespace;
    }
    return NS.root.resolve(namespace);
  }

  constructor(name: string, parent?: NS) {
    if (!name && NS.root) {
      throw new Error('Root namespace already created, name required');
    }
    this.id = NS.newId();
    this.name = name;
    const domainName = parent
      ? `${parent.domainName}.${name}`.replace(/^\./, '')
      : '';
    this.domainName = domainName;
    this.parent = parent;
    if (parent) {
      parent.children.push(this);
    }
    NS.registry.set(domainName, this);
    log('cyan', `NS.new: #${this.id} ${domainName} "${name}"`);
  }

  get isRoot() {
    return !!this.parent;
  }

  addMessage(message: Message) {
    if (this.messages.length === 0) {
      message._isFirstForNS = true;
    }
    this.messages.push(message);
  }

  resolve(namespace: string): NS {
    const paths = namespace.split('.');
    let ns: NS = this;
    for (let i = 0; i < paths.length; i++) {
      let name = paths[i];
      const child = ns.getChildNamed(name);
      if (child) {
        ns = child;
      } else {
        ns = new NS(name, ns);
      }
      // ns = ns.getChildNamed(name) || new NS(name, ns);
    }
    return ns;
  }

  getChildNamed(name: string): NS | undefined {
    return this.children.find(ns => ns.name === name);
  }

  hasChildNamed(name: string) {
    return !!this.getChildNamed(name);
  }
}

export { NS };
