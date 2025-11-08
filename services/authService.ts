import type { User } from '../types';

// --- MOCK DATABASE ---
// In a real app, this would be your database (e.g., MongoDB, Firebase, PostgreSQL).

const DB_KEY = 'bloomy-mock-db';
const SESSION_KEY = 'bloomy-auth-session';

const initializeDb = (): { [email: string]: User & { passwordHash: string } } => {
  try {
    const storedDb = localStorage.getItem(DB_KEY);
    if (storedDb) {
      return JSON.parse(storedDb);
    }
  } catch (e) {
    console.error("Failed to parse mock DB from localStorage", e);
  }
  
  // Default DB if nothing in localStorage or parsing fails
  const defaultDb = {
    "test@example.com": {
      id: 'user-1',
      name: 'Sunshine',
      email: 'test@example.com',
      passwordHash: 'hashed_password_123' // The password for this user is "password"
    }
  };
  localStorage.setItem(DB_KEY, JSON.stringify(defaultDb));
  return defaultDb;
};

// Use `let` so it can be modified by the signup function.
let MOCK_USERS = initializeDb();

const saveDb = () => {
  localStorage.setItem(DB_KEY, JSON.stringify(MOCK_USERS));
};


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
      
      saveDb(); // Save the updated user list to localStorage

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
