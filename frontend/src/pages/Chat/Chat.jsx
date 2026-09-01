import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Chat.css";
import messageService from "../../services/messageService";
import userService from "../../services/userService";

function Chat() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const otherId = userId ? parseInt(userId) : null;

  const me = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_KEY));
  const isLoggedIn = !!localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [partner, setPartner] = useState(null);
  const [text, setText] = useState("");
  const threadEndRef = useRef(null);

  // redireciona para login se não estiver logado
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  const loadConversations = useCallback(async () => {
    try {
      const data = await messageService.getConversations();
      setConversations(data);
      return data;
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // carrega o cabeçalho (nome/foto) do parceiro
  useEffect(() => {
    if (!otherId) {
      setPartner(null);
      return;
    }
    const conv = conversations.find((c) => c.partner.user_id === otherId);
    if (conv) {
      setPartner(conv.partner);
    } else {
      userService
        .getUserById(otherId)
        .then((u) =>
          setPartner({
            user_id: u.user_id,
            user_name: u.user_name,
            user_photo: u.user_photo,
          })
        )
        .catch(() => setPartner(null));
    }
  }, [otherId, conversations]);

  // carrega e faz polling da conversa aberta
  useEffect(() => {
    if (!otherId) {
      setMessages([]);
      return;
    }

    let active = true;
    const load = async () => {
      try {
        const data = await messageService.getConversation(otherId);
        if (active) setMessages(data);
      } catch {
        // silencioso
      }
    };

    load();
    const interval = setInterval(load, 3000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [otherId]);

  // rola para a última mensagem
  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || !otherId) return;

    try {
      const sent = await messageService.sendMessage({
        fk_receiver_id: otherId,
        message_content: text.trim(),
      });
      setMessages((prev) => [...prev, sent]);
      setText("");
      loadConversations();
    } catch {
      alert("Não foi possível enviar a mensagem.");
    }
  };

  return (
    <main className="chat-main">
      <div className="chat-layout">
        {/* LISTA DE CONVERSAS */}
        <aside className="chat-sidebar">
          <h2 className="chat-sidebar-title">Conversas</h2>
          {conversations.length === 0 ? (
            <p className="chat-empty">Nenhuma conversa ainda.</p>
          ) : (
            conversations.map((c) => (
              <button
                key={c.partner.user_id}
                className={`chat-conversation ${
                  c.partner.user_id === otherId ? "active" : ""
                }`}
                onClick={() => navigate(`/chat/${c.partner.user_id}`)}
              >
                <img
                  className="chat-conversation-avatar"
                  src={c.partner.user_photo || "/images/DEFAULTIMAGE.png"}
                  alt={c.partner.user_name}
                />
                <div className="chat-conversation-info">
                  <span className="chat-conversation-name">
                    {c.partner.user_name}
                  </span>
                  <span className="chat-conversation-last">
                    {c.last_message}
                  </span>
                </div>
              </button>
            ))
          )}
        </aside>

        {/* THREAD */}
        <section className="chat-thread">
          {!otherId ? (
            <div className="chat-placeholder">
              <p>Selecione uma conversa para começar. 💬</p>
            </div>
          ) : (
            <>
              <header className="chat-thread-header">
                <img
                  className="chat-thread-avatar"
                  src={partner?.user_photo || "/images/DEFAULTIMAGE.png"}
                  alt={partner?.user_name}
                />
                <span className="chat-thread-name">
                  {partner?.user_name || "Conversa"}
                </span>
              </header>

              <div className="chat-messages">
                {messages.length === 0 ? (
                  <p className="chat-empty">
                    Nenhuma mensagem ainda. Diga olá! 👋
                  </p>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.message_id}
                      className={`chat-bubble ${
                        m.fk_sender_id === me?.user_id ? "mine" : "theirs"
                      }`}
                    >
                      {m.message_content}
                    </div>
                  ))
                )}
                <div ref={threadEndRef} />
              </div>

              <form className="chat-input-form" onSubmit={handleSend}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Escreva uma mensagem..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" disabled={!text.trim()}>
                  Enviar
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default Chat;
