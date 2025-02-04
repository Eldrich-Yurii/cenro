import { BrowserRouter } from "react-router-dom";
import HeroNavBar from "./pages/navbar/HeroNavBar";
import { AuthProvider } from './context/AuthContext.jsx'



function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <HeroNavBar />
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
