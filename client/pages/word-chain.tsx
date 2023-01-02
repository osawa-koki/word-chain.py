import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormControl } from 'react-bootstrap';

const App: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api');
      const data = await res.json();
      setResponse(JSON.stringify(data));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const randomWords = ['apple', 'banana', 'cherry', 'dog', 'elephant'];
    setWords(randomWords.slice(0, 5));
  }, []);

  const sendData = async () => {
    const data = { words };
    await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
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
            <Button variant="secondary" onClick={handleAdd}>
              Add
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
        <pre>{response}</pre>
      </Container>
    </main>
  );
};

export default App;
