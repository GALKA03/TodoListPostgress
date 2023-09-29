// "use client"
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { fetchLogin } from '../api';
// // Define the shape of the context
// interface AuthProviderProps {
//   children: React.ReactNode;
// }
// interface LoginResponse {
//   token: string| null;
//   user_name: string;
//   user_email: string;
// }
// interface AuthUser {
  
//   user_name: string;
//   user_email: string;
// }
// interface AuthContextProps {
//   token: string | null;
//   user: AuthUser | null;
//   setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => void;
//   logout: () => void;
// }


// // Create the context
// const AuthContext = createContext<AuthContextProps | undefined>(undefined);
// // Create the provider component
// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<AuthUser | null>(null);
//    const [token, setToken] = useState<string | null>
//   // (
// //   typeof window !== "undefined" ? localStorage.getItem('jwtToken') : null
// // );
// useEffect(() => {
//   // Check for stored user data in local storage
//   const storedUser = localStorage.getItem('authUser');
//   if (storedUser) {
//     setUser(JSON.parse(storedUser));
//   }

//   // Check for stored token in local storage
//   const storedToken = localStorage.getItem('jwtToken');
//   if (storedToken) {
//     setToken(storedToken);
//   }
// }, []);

//   const login = async (email: string, password: string) => {
//   try {
//     const responseData = await fetchLogin(email, password);
//     console.log('data context', responseData);
//     if (responseData.token) {
//       localStorage.setItem('jwtToken', responseData.token);
//       setToken(responseData.token);

//       const userInfo: LoginResponse = {
//         token: responseData.token,
//         user_name: responseData.user_name,
//         user_email: responseData.user_email
//       }; 
      
//       localStorage.setItem('authUser', JSON.stringify(userInfo));
//       setUser(userInfo);
//     } else {
//       console.error("No token received from the backend!");
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//   }
// };

// const logout = () => {
//     localStorage.removeItem('jwtToken');
//     localStorage.removeItem('authUser');
//     setUser(null);
//     setToken(null);
//   };
//   return (
//     <AuthContext.Provider value={{ user, setUser, token, isAuthenticated: !!token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook to access the context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };



