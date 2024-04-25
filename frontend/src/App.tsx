import { Container } from "react-bootstrap";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { CreateActivity } from "./pages/CreateActivity";
import About from "./pages/About";
import { Calendar } from "./components/Calendar/Calendar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Calendar />
      <Footer />
      <Container>
        <Routes>
          <Route path="/create-activity" element={<CreateActivity />} />
          <Route path="about" element={<About />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
