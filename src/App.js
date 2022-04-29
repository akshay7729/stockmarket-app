import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StockComponent from "./Components/StockComponent";

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="heading">
            <h3>Stock Market</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <StockComponent />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
