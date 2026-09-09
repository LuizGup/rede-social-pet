import "./MainSection.css"
import Animals from '../../../assets/Miscellaneous/animals.png/';
import CustomBtn from "../../CustomBtn/CustomBtn";

function MainSection() {
  return (
    <section className="home-section">
      <div className="home-section-text">
        <h1> A rede social de quem ama pets </h1>
        <h2> Compartilhe momentos, siga outros tutores e conecte-se com quem também é apaixonado por animais. </h2>
        <CustomBtn
          route="/sign-up"
          label="Criar conta"
          className="btn-lg me-2 mb-2"
        />
        <CustomBtn
          route="/login"
          label="Já tenho conta"
          className="btn-lg mb-2"
        />

      </div>
      <img className="home-section-img mt-3 me-3" src={Animals} alt="Logo Latidos&Ronrons" />
    </section>
  );
}

export default MainSection;
