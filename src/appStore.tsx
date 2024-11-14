import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the state and actions interface
interface AppState {
  dopen: boolean;
  isLoggedIn: boolean;
  updateOpen: (dopen: boolean) => void;
  login: () => void;
  logout: () => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      dopen: true,
      isLoggedIn: false, // Initialize as false
      updateOpen: (dopen) => set({ dopen }),
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    { name: 'my_app_store' }
  )
);

export default useAppStore;
