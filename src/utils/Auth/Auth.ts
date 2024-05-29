import { jwtDecode, JwtPayload } from "jwt-decode";

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);

    // Controlla se il token ha una proprietà 'exp' (expiry) e se è scaduto
    if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
      return false;
    }

    return true;
  } catch (error) {
    // Se c'è un errore nel decodificare il token, consideralo come non valido
    return false;
  }
};
