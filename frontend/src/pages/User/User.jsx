import "./User.css";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import UserEditModal from "../../components/UserComponents/UserEditModal/UserEditModal";
import DeleteAccountModal from "../../components/UserComponents/DeleteAccountModal/DeleteAccountModal";
import userService from "../../services/userService";

function User() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleEditClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteAccount = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
    localStorage.removeItem(import.meta.env.VITE_USER_KEY);
    navigate("/feed");
    window.location.reload();
  }, [navigate]);

  const handleConfirmDelete = async () => {
    try {
      setShowDeleteModal(false);
      await userService.deleteUser(userData.user_id);
      handleLogout();
    } catch (err) {
      console.error("Falha ao excluir a conta:", err);
      setError("Não foi possível excluir sua conta. Tente novamente mais tarde.");
    }
  };

  const handleUpdateUser = async (updatedData) => {
    // 'updatedData' = { nome, foto, bio, contato }
    try {
      const payload = {
        user_name: updatedData.nome,
        user_photo: updatedData.foto,
        user_bio: updatedData.bio,
        user_contact: updatedData.contato,
      };

      const updatedUser = await userService.updateUser(userData.user_id, payload);
      setUserData(updatedUser);
      setShowModal(false);
      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error("Falha ao atualizar dados do usuário:", err);
      setError("Não foi possível atualizar suas informações. Tente novamente mais tarde.");
    }
  };

  // Busca o perfil ao montar
  useEffect(() => {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const profileData = await userService.getUserProfile();
        setUserData(profileData);
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
        setError("Não foi possível carregar os dados do usuário. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <h4>Carregando seu perfil...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <h4 className="text-danger">{error}</h4>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <section className="container-fluid bg-light py-4" id="user-page">
      <div className="container bg-light pt-1" id="user-container">
        <div className="user-header mb-4" id="user-header">
          <h1 className="user-greeting fw-semibold">Olá, {userData?.user_name}!</h1>
          <p className="text-muted mb-0">Bem-vindo ao seu perfil.</p>
        </div>

        <div className="row g-4 justify-content-center" id="user-panel">
          <div className="col-12 col-md-7 col-lg-6">
            <div className="card shadow-sm rounded-3 border-0">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-person me-2 fs-4 text-primary "></i>
                  <h5 className="card-title user_title mb-0">Meu Perfil</h5>
                </div>
                <div className="text-center mb-3">
                  <img
                    className="user-avatar"
                    src={userData?.user_photo || "/images/DEFAULTIMAGE.png"}
                    alt={userData?.user_name}
                  />
                </div>
                <div className="mb-3">
                  <p className="text-muted small">Nome</p>
                  <p className="fw-semibold">{userData?.user_name}</p>
                </div>
                <div className="mb-3">
                  <p className="text-muted small">Email</p>
                  <p className="fw-semibold">{userData?.user_email}</p>
                </div>
                <div className="mb-3">
                  <p className="text-muted small">Bio</p>
                  <p className="fw-semibold">
                    {userData?.user_bio || "Nenhuma bio adicionada ainda."}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-muted small">Contato</p>
                  <p className="fw-semibold">
                    {userData?.user_contact || "Nenhum contato informado."}
                  </p>
                </div>
                <div className="d-flex flex-column gap-2">
                  <button
                    className="btn btn-outline-secondary ... button_black"
                    onClick={handleEditClick}
                  >
                    <i className="bi bi-pencil"></i> Editar Perfil
                  </button>
                  <button
                    className="btn btn-outline-secondary ... button_black"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right"></i> Sair da Conta
                  </button>
                  <button
                    className="btn btn-outline-secondary ... button_black"
                    onClick={handleDeleteAccount}
                  >
                    <i className="bi bi-trash"></i> Excluir Conta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserEditModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleUpdateUser}
        initialData={{
          nome: userData.user_name,
          email: userData.user_email,
          foto: userData.user_photo || "",
          bio: userData.user_bio || "",
          contato: userData.user_contact || "",
        }}
      />
      <DeleteAccountModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onDelete={handleConfirmDelete}
      />
    </section>
  );
}

export default User;
