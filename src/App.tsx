import "./App.css";
import ButtonBoxLeft from "./components/ChangeBox/ButtonsBox/ButtonBoxLeft/ButtonsBoxLeft";
import ButtonBoxRight from "./components/ChangeBox/ButtonsBox/ButtonBoxRight/ButtonBoxRight";
import ChangeBox from "./components/ChangeBox/ChangeBox";

function App() {
  return (
    <div>
      <div className="containerPC">
        <ButtonBoxLeft />
        <div className="containerRegion">
          <ChangeBox />
        </div>
        <ButtonBoxRight />
      </div>
    </div>
  );
}

export default App;
