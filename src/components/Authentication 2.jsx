import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";

const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const auth = getAuth(); // Inicializa Firebase Auth
  const googleProvider = new GoogleAuthProvider(); // Solo si usas login con Google

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate("/"); // Redirigir a la tienda si está autenticado
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  // Manejar login y registro
  const handleSubmit = async () => {
    setError(null);
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      setUser(userCredential.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // Login con Google
  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <Box>
          <Typography variant="h6">Benvingut, {user.email}</Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: "20px" }} onClick={() => signOut(auth)}>
            Tancar Sessió
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom>
            {isSignUp ? "Registre" : "Inicia Sessió"}
          </Typography>
          {error && <Alert severity="error" sx={{ marginBottom: "20px" }}>{error}</Alert>}
          <TextField label="Correu Electrònic" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ marginBottom: "15px" }} />
          <TextField label="Contrasenya" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ marginBottom: "20px" }} />
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            {isSignUp ? "Registra't" : "Inicia Sessió"}
          </Button>
          <Button variant="outlined" color="secondary" fullWidth sx={{ marginTop: "15px" }} onClick={handleGoogleSignIn}>
            Inicia Sessió amb Google
          </Button>
          <Typography variant="body2" sx={{ marginTop: "20px", cursor: "pointer" }} onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Ja tens un compte? Inicia sessió." : "No tens un compte? Registra't."}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Authentication;
