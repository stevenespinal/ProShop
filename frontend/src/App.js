import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from "react-bootstrap";

const App = () => {
  return (
    <>
      <Header/>
      <main className="py-4">
        <Container>
          <h1>Welcome to ProShop</h1>
        </Container>
      </main>
      <Footer/>
    </>
  );
}

export default App;