import Container from "./components/Container";
import Screen from "./components/Screen";
import ButtonPanel from "./components/ButtonPanel";
import Button from "./components/Button";
import { useState } from "react";

const buttonValues = [
  ["AC", "⌫", "/", "x"],
  [7, 8, 9, "-"],
  [6, 5, 4, "+"],
  [1, 2, 3, "="],
  [0, "."],
];

const App = () => {
  return (
    <Container>
      <Screen />
      <ButtonPanel>
        <Button />
      </ButtonPanel>
    </Container>
  );
};

export default App;
