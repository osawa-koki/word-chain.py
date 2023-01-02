import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormControl } from 'react-bootstrap';
import { BsFillArrowRightSquareFill } from "react-icons/bs";

const App: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const randomWords = ['apple', 'banana', 'cherry', 'dog', 'elephant'];
    setWords(randomWords.slice(0, 5));
  }, []);

  const sendData = async () => {
    const data = { words };
    const response = await fetch('/api/word-chain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({words: data.words.filter((word) => word !== '')}),
    });
    const result = await response.json();
    setItems(result);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendData();
  };

  const handleAdd = () => {
    setWords([...words, '']);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newWords = [...words];
    newWords[index] = event.target.value;
    setWords(newWords);
  };

  return (
    <main>
      <Container>
        <Form onSubmit={handleSubmit}>
          {words.map((word, index) => (
            <Form.Group key={index}>
              <Form.Label>Word {index + 1}:</Form.Label>
              <FormControl
                type="text"
                value={word}
                onChange={(event) => handleChange(event, index)}
              />
            </Form.Group>
          ))}
          <div id="ButtonContainer">
            <Button variant="secondary" onClick={handleAdd} disabled={30 <= words.length}>
              Add
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
          <div id="Result">
            {
              items.map((item, index) => (
                <>
                  <p key={index}>{item}</p>
                  <BsFillArrowRightSquareFill />
                </>
              ))
            }
          </div>
        </Form>
      </Container>
    </main>
  );
};

export default App;
