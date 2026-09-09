import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUpUser from "./pages/SignUpUser/SignUpUser";
import Feed from "./pages/Feed/Feed";
import Search from "./pages/Search/Search";
import Notifications from "./pages/Notifications/Notifications";
import Chat from "./pages/Chat/Chat";
import User from "./pages/User/User";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUpUser />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/busca" element={<Search />} />
            <Route path="/notificacoes" element={<Notifications />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:userId" element={<Chat />} />
            <Route path="/user" element={<User />} />
            <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
          </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
