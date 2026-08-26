// Arquivo: /src/components/UserComponents/UserEditModal/UserEditModal.jsx

import "./UserEditModal.css";
import { useState, useEffect } from "react";

function UserEditModal({ show, onClose, onSave, initialData = {} }) {
    const [nome, setNome] = useState(initialData.nome || "");
    const [foto, setFoto] = useState(initialData.foto || "");
    const [bio, setBio] = useState(initialData.bio || "");
    const [contato, setContato] = useState(initialData.contato || "");

    // Sincroniza os campos quando o initialData mudar (ex: ao abrir o modal)
    useEffect(() => {
        setNome(initialData.nome || "");
        setFoto(initialData.foto || "");
        setBio(initialData.bio || "");
        setContato(initialData.contato || "");
    }, [initialData]);

    const resetFields = () => {
        setNome(initialData.nome || "");
        setFoto(initialData.foto || "");
        setBio(initialData.bio || "");
        setContato(initialData.contato || "");
    };

    const handleCloseModal = () => {
        resetFields();
        if (onClose) onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSave) onSave({ nome, foto, bio, contato });
        // O modal fecha no User.jsx após o sucesso da API
    };

    if (!show) return null;

    return (
        <div className="modal fade show" id="user-edit-modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Perfil</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleCloseModal}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Foto (URL)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="foto"
                                    placeholder="https://..."
                                    value={foto}
                                    onChange={(e) => setFoto(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Bio</label>
                                <textarea
                                    className="form-control"
                                    name="bio"
                                    rows={3}
                                    maxLength={300}
                                    placeholder="Fale um pouco sobre você e seus pets"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contato</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="contato"
                                    placeholder="E-mail, telefone ou @rede social"
                                    value={contato}
                                    onChange={(e) => setContato(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCloseModal}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserEditModal;
