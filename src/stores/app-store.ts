import { action, makeObservable } from 'mobx';

interface IDataStore {
  reset(): void;
}

export abstract class DataStore implements IDataStore {
  protected constructor() {
    appStore.dataStore.push(this);
    makeObservable(this, {
      reset: action,
    });
  }

  abstract reset(): void;
}

class AppStore implements IDataStore {
  dataStore: DataStore[] = [];

  reset = () => {
    this.dataStore.forEach((store) => store.reset());
  };
}

export const appStore = new AppStore();
