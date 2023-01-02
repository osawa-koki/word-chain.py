import React from 'react';

function App() {
  const [words, setWords] = React.useState<string[]>([]);
  const [response, setResponse] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch('/api');
    const data = await res.json();
    setResponse(JSON.stringify(data));
  };

  const handleAdd = () => {
    setWords([...words, '']);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newWords = [...words];
    newWords[index] = event.target.value;
    setWords(newWords);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        {words.map((word, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={`word-${index}`}>Word {index + 1}:</label>
            <input
              type="text"
              className="form-control"
              id={`word-${index}`}
              value={word}
              onChange={(event) => handleChange(event, index)}
            />
          </div>
        ))}
        <button type="button" className="btn btn-secondary mr-2" onClick={handleAdd}>
          Add
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <pre className="mt-5">{response}</pre>
    </div>
  );
}

export default App;
