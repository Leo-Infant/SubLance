import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { NextUIProvider } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource-variable/comfortaa";
import Toaster from './Components/SubtitleTool/Toaster';
import LoginForm from "./Components/LoginAndRegistration/LoginForm";
import Registration from "./Components/LoginAndRegistration/Registration";
import CreatorHomePage from "./Components/ContentCreator/CreatorHomePage";
import FreeLancerHomePage from "./Components/FreeLancer/FreeLancerHomePage";
import CreatePost from './Components/ContentCreator/CreatePost';
import CreatorAssigned from './Components/ContentCreator/CreatorAssigned';
import LogOut from './Components/LoginAndRegistration/LogOut';
import  FreeLancerProposals from './Components/FreeLancer/FreeLancerProposals';
import SubtitleTool from './Components/SubtitleTool/SubtitlePage';
import FreeLancerAssigned from './Components/FreeLancer/FreeLancerAssigned';
import HomePage from './Components/HomePage';
function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
        <NextUIProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/homePage" />} /> 
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/creatorHome" element={<CreatorHomePage />} />
          <Route path="/freelancerHome" element={<FreeLancerHomePage />} />
          <Route path="/createPost" element={<CreatePost />}/>
          <Route path="creatorAssigned" element={<CreatorAssigned/>} />
          <Route path="/logout" element={<LogOut/>}/>
          <Route path="/freeLancerProposals" element={<FreeLancerProposals/>}/>
          <Route path="/subtitleTool" element={<SubtitleTool />}/>
          <Route path="/freeLancerAssigned" element={<FreeLancerAssigned />}/>
          <Route path="/homePage" element={<HomePage />}/>
        </Routes>
        <Toaster />
        </NextUIProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
