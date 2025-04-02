import { create } from 'zustand';
import useAuthStore from './authStore';

interface PredictionState {
  prediction: number | null;
  loading: boolean;
  error: string | null;
  predictRecoveryTime: (userData: AthleteData, inputData: TrainingData) => Promise<number>;
  resetPrediction: () => void;
}

interface AthleteData {
  Age: number;
  Height_cm: number;
  Weight_kg: number;
  Gender: 'male' | 'female';
}

interface TrainingData {
  Training_Intensity: number;
  Training_Hours_Per_Week: number;
  Match_Count_Per_Week: number;
  Fatigue_Score: number;
  ACL_Risk_Score: number;
}

const usePredictionStore = create<PredictionState>((set) => ({
  prediction: null,
  loading: false,
  error: null,

  predictRecoveryTime: async (userData, inputData) => {
    try {
      set({ loading: true, error: null });
      
      // Combine all data into a single request object
      const requestData = {
        Age: userData.Age,
        Height_cm: userData.Height_cm,
        Weight_kg: userData.Weight_kg,
        Gender: userData.Gender,
        ...inputData
      };

      console.log('Sending prediction request:', requestData);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/ml/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useAuthStore.getState().user?.token}`,
        },
        body: JSON.stringify(requestData),
      });

      console.log('Received response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Prediction failed:', errorData);
        throw new Error(errorData.message || 'Prediction failed');
      }

      const result = await response.json();
      console.log('Prediction result:', result);

      const prediction = result.predicted_recovery_days;
      set({ prediction });
      return prediction;
    } catch (error) {
      console.error('Error during prediction:', error);
      set({ error: error instanceof Error ? error.message : 'Prediction failed' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  resetPrediction: () => set({ prediction: null, error: null }),
}));

export default usePredictionStore;