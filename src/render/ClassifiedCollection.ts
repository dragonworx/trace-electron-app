export type ClassifierFn<T> = (item: T) => string;

export class ClassifiedCollection<T> {
  private classifiers: Array<ClassifierFn<T>> = [];
  private segments: Map<string, Array<T>> = new Map();

  constructor(classifiers?: Array<ClassifierFn<T>>, initialValues?: T[]) {
    const allArray = this.getSegment('*');
    if (initialValues) {
      allArray.push.apply(allArray, initialValues);
    }

    if (classifiers) {
      this.classifiers.push.apply(this.classifiers, classifiers);
    }

    for (let i = 0; i < allArray.length; i++) {
      const value = allArray[i];
      this.ingest(value);
    }
  }

  get length() {
    return this.getSegment('*').length;
  }

  clear() {
    this.segments.clear();
  }

  getSegment(classification: string) {
    const { segments } = this;
    if (!segments.get(classification)) {
      segments.set(classification, []);
    }
    return segments.get(classification) as Array<T>;
  }

  ingest(value) {
    this.classifiers
      .map(classiferFn => classiferFn(value))
      .forEach(classification => {
        const segment = this.getSegment(classification);
        segment.push(value);
      });
    this.getSegment('*').push(value);
  }

  add(item) {
    this.ingest(item);
  }
}
