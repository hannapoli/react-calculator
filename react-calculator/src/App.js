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

//Support function that converts the number into a string and adds spaces to sepatate 3 digits.
//(?<!\..*): ensures that we are not inside the decimal part.
//(\d): Captures a digit.
//(?=(?:\d{3})+(?:\.|$)): checks if the digit is followed by a group of 3 digits before a decimal or end of string.
//$1 refers to the captured digit and adds a space (" ") after it.
const numberToString = (number) =>
  String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

//Support function that converts the number into a string and removes the spaces
//replaces all the spaces \s globally /g with "" (empty string).
const removeSpaces = (number) => number.toString().replace(/\s/g, "");

const App = () => {
  let [input, setInput] = useState({
    number: 0,
    operator: "",
    result: 0,
  });

  const writeNumber = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(input.number).replace(/\D/g, "").length < 16) {
      setInput({
        ...input,
        number:
          input.number === 0 && value === "0"
            ? "0"
            : removeSpaces(input.number) && removeSpaces(input.number) % 1 === 0
            ? numberToString(Number(removeSpaces(input.number + value)))
            : numberToString(input.number + value),
        result: input.operator ? input.result : 0,
      });
    }
  };

  const writeDecimal = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setInput({
      ...input,
      number: input.number.toString().includes(".")
        ? input.number
        : input.number + value,
    });
  };

  const writeOperator = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setInput({
      ...input,
      operator: value,
      result: !input.result && input.number ? input.number : input.result,
      number: 0,
    });
  };

  const clearAll = () => {
    setInput({
      ...input,
      operator: "",
      number: 0,
      result: 0,
    });
  };

  const deleteLast = (e) => {
    e.preventDefault();

    setInput((previousInput) => {
      const currentState = removeSpaces(previousInput.number).slice(0, -1);

      return {
        ...previousInput,
        number: currentState === "" ? 0 : numberToString(currentState),
      };
    });
  };

  const showResult = () => {
    if (input.operator && input.number) {
      const calculate = (n1, n2, operator) =>
        operator === "+"
          ? n1 + n2
          : operator === "-"
          ? n1 - n2
          : operator === "x"
          ? n1 * n2
          : n1 / n2;

      setInput({
        ...input,
        result:
          input.number === "0" && input.operator === "/"
            ? "Error"
            : numberToString(
                calculate(
                  Number(removeSpaces(input.result)),
                  Number(removeSpaces(input.number)),
                  input.operator
                )
              ),
        operator: "",
        number: 0,
      });
    }
  };

  const buttonClass = (btn) => {
    if (btn === "=") return "equals pink-button";
    if (btn === 0) return "zero";
    if (["AC", "⌫", "/", "x", "-", "+"].includes(btn)) return "pink-button";
    return "";
  };

  const buttonHandler = (btn) => {
    return btn === "AC"
      ? clearAll
      : btn === "⌫"
      ? deleteLast
      : btn === "/" || btn === "x" || btn === "-" || btn === "+"
      ? writeOperator
      : btn === "="
      ? showResult
      : btn === "."
      ? writeDecimal
      : writeNumber;
  };

  return (
    <Container>
      <Screen value={input.number ? input.number : input.result} />
      <ButtonPanel>
        {buttonValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={buttonClass(btn)}
              value={btn}
              onClick={(e) => buttonHandler(btn)(e)}
            />
          );
        })}
      </ButtonPanel>
    </Container>
  );
};

export default App;
