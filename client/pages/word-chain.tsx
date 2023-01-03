import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormControl } from 'react-bootstrap';
import { BsFillArrowRightSquareFill } from "react-icons/bs";

import Layout from '../components/Layout';
import { fruits, reserved_words, fish, animals } from '../src/words';

const LIMIT = 100;

const App: React.FC = () => {

  const [count, setCount] = useState(30);
  const [words, setWords] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const words = fruits.sort(() => Math.random() - Math.random()).slice(0, count);
    setWords(words);
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

  const handleDelete = () => {
    const newWords = [...words];
    newWords.pop();
    setWords(newWords);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newWords = [...words];
    newWords[index] = event.target.value;
    setWords(newWords);
  };

  const SetTemplate = (template: string) => {
    if (template === 'fruits') {
      setWords(fruits.sort(() => Math.random() - Math.random()).slice(0, count));
    }
    if (template === 'reserved_words') {
      setWords(reserved_words.sort(() => Math.random() - Math.random()).slice(0, count));
    }
    if (template === 'fish') {
      setWords(fish.sort(() => Math.random() - Math.random()).slice(0, count));
    }
    if (template === 'animals') {
      setWords(animals.sort(() => Math.random() - Math.random()).slice(0, count));
    }
  };

  return (
    <Layout>
      <main>
        <Container>
          <Form onSubmit={handleSubmit}>
            <div id="InputCollection">
              {words.map((word, index) => (
                <Form.Group key={index}>
                  <FormControl
                    type="text"
                    value={word}
                    onChange={(event) => handleChange(event, index)}
                  />
                </Form.Group>
              ))}
            </div>
            <div id="ButtonContainer">
              <Button variant="secondary" type="button" onClick={handleAdd} disabled={LIMIT <= words.length}>
              🐬 Add 🐬
              </Button>
              <Button variant="primary" type="submit">
              🐙🐙🐙 Submit 🐙🐙🐙
              </Button>
              <Button variant="danger" type="button" onClick={handleDelete} disabled={words.length <= 3}>
                Delete Word
              </Button>
            </div>
            <div id='Template'>
              <Button variant="outline-success" type="button" onClick={() => {SetTemplate('fruits')}}>🍉果物🍊</Button>
              <Button variant="outline-secondary" type="button" onClick={() => {SetTemplate('reserved_words')}}>💻予約語🖥</Button>
              <Button variant="outline-primary" type="button" onClick={() => {SetTemplate('fish')}}>🐠魚🐟</Button>
              <Button variant="outline-warning" type="button" onClick={() => {SetTemplate('fish')}}>🐶動物🦁</Button>
              <FormControl
                type="number"
                value={count}
                onChange={(event) => setCount(parseInt(event.target.value))}
              />
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
    </Layout>
  );
};

export default App;
