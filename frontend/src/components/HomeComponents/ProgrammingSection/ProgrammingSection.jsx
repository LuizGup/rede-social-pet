import "./ProgrammingSection.css"

function ProgrammingSection() {

  const actions = [
    {
      icon: "dynamic_feed",
      title: "Feed de publicações",
      text: "Publique textos, fotos e vídeos dos seus pets e acompanhe o que a comunidade está compartilhando."
    },
    {
      icon: "favorite",
      title: "Curtidas e comentários",
      text: "Interaja com as publicações: curta o que gostar e comente para conversar com outros tutores."
    },
    {
      icon: "group",
      title: "Seguir pessoas",
      text: "Siga quem você quer acompanhar e monte um feed personalizado com a aba 'Seguindo'."
    },
    {
      icon: "chat",
      title: "Chat privado",
      text: "Converse em particular com outros usuários por mensagens diretas dentro da plataforma."
    }
  ];

  return (
    <section className="programming-section" id="programming-section">
      <div className="programming-section-text">
        <h3> O que você pode fazer </h3>
        <p> A Latidos & Ronrons reúne tudo o que você precisa para compartilhar a vida do seu pet e se conectar
          com a comunidade. </p>
      </div>

      <div className="cards-conteiner">
        {actions.map((action, index) => (
          <div key={index} className="card custom-actions-card">
            <div  className="card-body">
              <span className="material-symbols-outlined">{action.icon}</span>
              <h5 className="card-title"> {action.title}</h5>
              <h6 className="card-subtitle mb-2 ">{action.text}</h6>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default ProgrammingSection;
