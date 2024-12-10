// Session Timeout & Cookies
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FirebaseSession = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        navigate("/auth");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  return null;
}
/*
export const FirebaseSessionAdmin = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        navigate("/auth");
      } else if (user.email !== "kfukutom@umich.edu") {
        navigate("/dashboard");
      } else {
        navigate("/admin");
      }

}*/

export default { FirebaseSession };