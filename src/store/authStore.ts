import { create } from 'zustand';

interface AthleteData {
  email: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female';
  heightCm: number;
  weightKg: number;
  position: 'Center' | 'Forward' | 'Guard';
}

interface FormData {
  fullName: string;
  email: string;
  password: string;
  age: number;
  gender: 'Male' | 'Female';
  heightCm: number;
  weightKg: number;
  position: 'Center' | 'Forward' | 'Guard';
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthState {
  loading: boolean;
  initialized: boolean; // Track if auth state has been initialized
  error: string | null;
  user: null | { 
    athlete: AthleteData; 
    token: string;
  };
  register: (formData: FormData) => Promise<void>;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => void;
  initializeAuth: () => Promise<void>;
  updateAthleteProfile: (data: Partial<AthleteData>) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  initialized: false, // Initially not initialized
  error: null,
  user: null,

  register: async (formData) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.token && data.athlete) {
        set({ user: data });
        localStorage.setItem('token', data.token);
      }
    } catch (error: unknown) {
      let errorMessage = 'Registration failed';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  login: async ({ email, password }: LoginData) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      set({ user: data });
      localStorage.setItem('token', data.token);
    } catch (error: unknown) {
      let errorMessage = 'Login failed';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },

  initializeAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ initialized: true });
        return;
      }

      set({ loading: true });
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Invalid token');
      
      const data = await response.json();
      set({ 
        user: { athlete: data.athlete, token },
        initialized: true 
      });
    } catch (error) {
      localStorage.removeItem('token');
      set({ 
        user: null,
        initialized: true 
      });
    } finally {
      set({ loading: false });
    }
  },

  updateAthleteProfile: async (data) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      if (!token || !useAuthStore.getState().user) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const updatedData = await response.json();

      if (!response.ok) {
        throw new Error(updatedData.message || 'Profile update failed');
      }

      set(state => ({
        user: state.user ? { 
          ...state.user, 
          athlete: { 
            ...state.user.athlete, 
            ...updatedData.athlete 
          } 
        } : null
      }));
    } catch (error: unknown) {
      let errorMessage = 'Profile update failed';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
}));

// Initialize auth state when the store is created
useAuthStore.getState().initializeAuth();

export default useAuthStore;