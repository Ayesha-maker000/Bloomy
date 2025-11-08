import type { User } from '../types';

// --- MOCK DATABASE ---
// In a real app, this would be your database (e.g., MongoDB, Firebase, PostgreSQL).
const MOCK_USERS: { [email: string]: User & { passwordHash: string } } = {
  "test@example.com": {
    id: 'user-1',
    name: 'Sunshine',
    email: 'test@example.com',
    passwordHash: 'hashed_password_123' // In a real app, this would be a proper bcrypt hash
  }
};

const SESSION_KEY = 'bloomy-auth-session';

// --- MOCK API FUNCTIONS ---

/**
 * Simulates a user signing up.
 * In a real app, this would make a POST request to your /api/signup endpoint.
 */
export const signup = (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_USERS[email]) {
        return reject(new Error('An account with this email already exists.'));
      }
      if (password.length < 6) {
        return reject(new Error('Password must be at least 6 characters long.'));
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
      };

      MOCK_USERS[email] = {
        ...newUser,
        passwordHash: `hashed_${password}_123`, // MOCK HASHING
      };

      const mockToken = `mock-jwt-token-for-${newUser.id}`;
      
      localStorage.setItem(SESSION_KEY, JSON.stringify({ user: newUser, token: mockToken }));

      resolve({ user: newUser, token: mockToken });
    }, 1000); // Simulate network delay
  });
};

/**
 * Simulates a user logging in.
 * In a real app, this would make a POST request to your /api/login endpoint.
 */
export const login = (email: string, password: string): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const storedUser = MOCK_USERS[email];
      const mockPasswordHash = `hashed_${password}_123`;

      if (storedUser && storedUser.passwordHash === mockPasswordHash) {
        const user: User = { id: storedUser.id, name: storedUser.name, email: storedUser.email };
        const mockToken = `mock-jwt-token-for-${user.id}`;

        localStorage.setItem(SESSION_KEY, JSON.stringify({ user, token: mockToken }));
        
        resolve({ user, token: mockToken });
      } else {
        reject(new Error('Invalid email or password.'));
      }
    }, 1000); // Simulate network delay
  });
};

/**
 * Simulates logging out. Clears the session from localStorage.
 */
export const logout = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

/**
 * Checks for a saved session in localStorage on app load.
 */
export const checkSession = (): { user: User; token: string } | null => {
  const session = localStorage.getItem(SESSION_KEY);
  if (session) {
    try {
      return JSON.parse(session);
    } catch (error) {
      console.error("Failed to parse session", error);
      return null;
    }
  }
  return null;
};
