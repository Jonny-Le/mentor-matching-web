import { action, makeObservable, observable } from 'mobx';
import { User } from '@src/models/user';
import { DataStore } from './app-store';

class UserStore extends DataStore {
  currentUser?: User | null;

  constructor() {
    super();
    makeObservable(this, {
      currentUser: observable,
      setCurrentUser: action,
    });
    this.setCurrentUser({
      id: 1,
      name: 'John Doe',
    });
  }

  reset(): void {
    this.currentUser = null;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }
}

export const useStore = new UserStore();
