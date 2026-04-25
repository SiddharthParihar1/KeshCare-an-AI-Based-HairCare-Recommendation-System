import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialFormData = {
  hairType: '',
  hairTexture: '',
  scalpCondition: '',
  problems: [],
  lifestyle: [],
  washFrequency: '',
  waterType: '',
  notes: '',
};

export const useKeshCareStore = create(
  persist(
    (set, get) => ({
      currentStep: 1,
      totalSteps: 4,
      formData: initialFormData,
      recommendations: null,
      isLoading: false,
      error: null,
      history: [],

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, s.totalSteps) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
      updateForm: (data) => set((s) => ({ formData: { ...s.formData, ...data } })),
      toggleArrayField: (field, value) =>
        set((s) => {
          const arr = s.formData[field];
          return {
            formData: {
              ...s.formData,
              [field]: arr.includes(value)
                ? arr.filter((v) => v !== value)
                : [...arr, value],
            },
          };
        }),

      setLoading: (isLoading) => set({ isLoading }),
      setRecommendations: (data) => set({ recommendations: data, error: null }),
      setError: (error) => set({ error, recommendations: null }),

      addToHistory: (entry) =>
        set((s) => ({
          history: [{ ...entry, id: Date.now(), date: new Date().toISOString() }, ...s.history].slice(0, 10),
        })),

      resetForm: () =>
        set({
          currentStep: 1,
          formData: initialFormData,
          recommendations: null,
          error: null,
          isLoading: false,
        }),

      clearHistory: () => set({ history: [] }),
      getHistoryItem: (id) => get().history.find((item) => item.id === id),
    }),
    {
      name: 'keshcare-storage',
      partialize: (state) => ({ history: state.history }),
    },
  ),
);
