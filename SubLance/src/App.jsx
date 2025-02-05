import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import { AuthProvider } from './Components/context/AuthContext'; // Import AuthProvider
import LoginForm from "./Components/LoginForm";
import Registration from "./Components/Registration";
import CreatorHomePage from "./Components/CreatorHomePage";
import FreeLancerHomePage from "./Components/FreeLancerHomePage";
import CreatePost from './Components/CreatePost';
import CreatorAssigned from './Components/CreatorAssigned';
import LogOut from './Components/LogOut';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/creatorHome" element={<CreatorHomePage />} />
        <Route path="/freelancerHome" element={<FreeLancerHomePage />} />
        <Route path="/createPost" element={<CreatePost />}/>
        <Route path="creatorAssigned" element={<CreatorAssigned/>} />
        <Route path="/logout" element={<LogOut/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
