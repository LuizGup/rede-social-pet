import "./AboutSection.css"

function AboutSection() {


  const aboutItems = [
    {
      title: "O que é a Latidos & Ronrons",
      text: "A Latidos & Ronrons é uma rede social feita para tutores e apaixonados por pets. Aqui você cria seu perfil, publica sobre seus animais e se conecta com uma comunidade que fala a mesma língua: a do amor pelos bichos.",
      accordion: "flush-collapseOne"
    },
    {
      title: "Como funciona",
      text: "É simples: crie sua conta, monte seu perfil com foto e bio, e comece a publicar. Você pode curtir e comentar as postagens de outras pessoas, seguir quem você gosta e acompanhar tudo pelo seu feed.",
      accordion: "flush-collapseTwo"
    },
    {
      title: "Nossa comunidade",
      text: "Siga outros tutores e monte um feed do seu jeito, só com quem você quer acompanhar. Descubra pessoas e publicações pela busca e converse no privado com o chat entre usuários.",
      accordion: "flush-collapseThree"
    }, {
      title: "Nosso propósito",
      text: "Acreditamos que todo momento com um pet merece ser compartilhado. Nosso propósito é aproximar pessoas que amam animais e transformar essa paixão em uma comunidade ativa e acolhedora.",
      accordion: "flush-collapseFour"
    }
  ]

  return (
    <section className="about-section" id="about">
      <h3> Sobre a Latidos & Ronrons </h3>
      <div className="accordion accordion-flush" id="accordionFlushExample">


        {aboutItems.map((item) => (
          <div key={item.accordion} className="accordion-item">

            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target={`#${item.accordion}`} aria-expanded="false" aria-controls={item.accordion}>
                {item.title}
              </button>
            </h2>

            <div id={item.accordion} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                {item.text}
              </div>
            </div>

          </div>

        ))}
      </div>

    </section>
  );
}

export default AboutSection;
