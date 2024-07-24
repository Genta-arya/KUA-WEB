
import {create} from 'zustand';

const useSidebarStore = create((set) => ({
  currentView: 'pengajuan', // Default view
  setCurrentView: (view) => set({ currentView: view }),
}));

export default useSidebarStore;
