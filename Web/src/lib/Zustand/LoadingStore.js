import { create } from "zustand";

const useLoading = create((set) => ({
    isLoading: false,
    setLoading: (isLoading) => set({ isLoading }),
}));

export default useLoading