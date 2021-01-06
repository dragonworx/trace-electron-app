export type ClassifierFn<T> = (item: T) => boolean;

export type Classification<T> = {
  name: string;
  values: T[];
  accepts: ClassifierFn<T>;
};

export type Classifications<T> = {
  [name: string]: ClassifierFn<T>;
};

export class ClassyCollection<T> {
  values: T[] = [];
  private classifications: Map<string, Classification<T>> = new Map();

  constructor(classifications?: Classifications<T>, initialValues?: T[]) {
    if (initialValues) {
      this.values = initialValues;
    }

    if (classifications) {
      Object.keys(classifications).forEach(name => {
        this.addClassification(name, classifications[name]);
      });
    }

    const { values } = this;
    if (values.length) {
      this.values = values.filter(value => {
        this.applyClassifications(value);
      });
    }
  }

  get length() {
    return this.values.length;
  }

  clear() {
    this.values.length = 0;
  }

  addClassification(name: string, classifierFn: ClassifierFn<T>) {
    this.classifications.set(name, {
      name,
      values: [],
      accepts: classifierFn,
    });
  }

  applyClassifications(value: T) {
    for (let [, classification] of this.classifications) {
      if (classification.accepts(value)) {
        classification.values.push(value);
      }
    }
  }

  getValuesForClassification(name?: string): Array<T> {
    if (name === undefined) {
      return this.values;
    }
    const classification = this.classifications.get(name);
    return classification ? classification.values : [];
  }

  add(value: T) {
    this.values.push(value);
    this.applyClassifications(value);
  }

  map<MT>(fn: (item: T, i: number) => MT) {
    return this.values.map(fn);
  }
}
