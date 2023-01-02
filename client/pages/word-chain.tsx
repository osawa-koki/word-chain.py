import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormControl } from 'react-bootstrap';
import { BsFillArrowRightSquareFill } from "react-icons/bs";

import Layout from '../components/Layout';
import words_template from '../src/words';

const LIMIT = 50;

const App: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const words = words_template.sort(() => Math.random() - Math.random()).slice(0, 20);
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
