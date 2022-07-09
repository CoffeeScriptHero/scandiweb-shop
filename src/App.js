import { Component } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <AppRoutes />
      </div>
    );
  }
}

export default App;
