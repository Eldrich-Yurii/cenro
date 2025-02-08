// import { BrowserRouter } from "react-router-dom";
import HeroNavBar from "./pages/navbar/HeroNavBar";
import AppRoutes from "./routes/AppRoutes";
// import { AuthProvider } from "./context/AuthContext.jsx";
import { useAuth } from "./context/AuthContext";
function App() {
  const { user } = useAuth();
  return (
    <>
      
      {!user?.token && <HeroNavBar />}
      <AppRoutes />
    </>
  );
}

export default App;
