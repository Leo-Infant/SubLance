import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import { AuthProvider } from './Components/context/AuthContext';
import LoginForm from "./Components/LoginAndRegistration/LoginForm";
import Registration from "./Components/LoginAndRegistration/Registration";
import CreatorHomePage from "./Components/ContentCreator/CreatorHomePage";
import FreeLancerHomePage from "./Components/FreeLancer/FreeLancerHomePage";
import CreatePost from './Components/ContentCreator/CreatePost';
import CreatorAssigned from './Components/ContentCreator/CreatorAssigned';
import LogOut from './Components/LoginAndRegistration/LogOut';

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/freelancerHome" />} /> 
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
