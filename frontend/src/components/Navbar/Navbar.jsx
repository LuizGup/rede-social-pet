import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import LogoTitulo from '../../assets/LogoTitulo/LogoTitle2.png';
import Logo3 from '../../assets/Logos/logo3.png/';
import notificationService from "../../services/notificationService";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  // usuário logado se o token existir no localStorage
  const isLoggedIn = !!localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);

  // contagem de notificações não lidas (atualiza a cada navegação)
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      setUnreadCount(0);
      return;
    }
    notificationService
      .getUnreadCount()
      .then((count) => setUnreadCount(count))
      .catch(() => setUnreadCount(0));
  }, [isLoggedIn, location.pathname]);

  return (
      <nav className="header-container navbar navbar-expand-lg sticky-top" id="navbar-container">
        <div className="container-fluid">
          <Link to={"/"}>
            <img
              className="navbar-img logo-grande"
              src={LogoTitulo}
              alt="Logo Latidos&Ronrons"
            />
            <img
              className="navbar-img logo-pequena"
              src={Logo3}
              alt="Logo Latidos&Ronrons"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link navbar-link btn btn-link" to={"/feed"}>
                Feed
              </Link>
              <Link className="nav-link navbar-link btn btn-link" to={"/busca"}>
                Buscar
              </Link>

              {isLoggedIn ? (
                // Logado: notificações, mensagens e perfil
                <>
                  <Link className="nav-link navbar-link btn btn-link" to={"/notificacoes"}>
                    Notificações
                    {unreadCount > 0 && (
                      <span className="notif-badge">{unreadCount}</span>
                    )}
                  </Link>
                  <Link className="nav-link navbar-link btn btn-link" to={"/chat"}>
                    Mensagens
                  </Link>
                  <Link className="nav-link navbar-link btn btn-link" to={"/user"}>
                    Perfil
                  </Link>
                </>
              ) : (
                // Deslogado: entrar e cadastrar
                <>
                  <Link className="nav-link navbar-link btn btn-link" to={"/login"}>
                    Entrar
                  </Link>
                  <Link className="nav-link navbar-link btn btn-link" to={"/sign-up"}>
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
