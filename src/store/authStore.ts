import { create } from 'zustand';

interface AuthStore {
  userToken: string | null;
  setToken: (token: string | null) => void;
}

const getTokenWithExpiry = (): string | null => {
  const itemString = localStorage.getItem('token');
  if (!itemString) {
    return null;
  }

  const item = JSON.parse(itemString);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem('token');
    return null;
  }

  return item.value;
};

const useAuthStore = create<AuthStore>((set) => {
  const initialToken = getTokenWithExpiry();

  return {
    userToken: initialToken,
    setToken: (userToken) => {
      if (userToken) {
        const now = new Date();
        const expiry = now.getTime() + 30 * 60 * 1000;
        const item = { value: userToken, expiry };
        localStorage.setItem('token', JSON.stringify(item));
      } else {
        localStorage.removeItem('token');
      }

      set({ userToken });
    },
  };
});

export default useAuthStore;
