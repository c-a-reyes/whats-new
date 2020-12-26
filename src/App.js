import React, { useState, useEffect } from 'react';
import {
  CardMedia,
  TextField,
  Typography,
  Button,
  Paper,
} from '@material-ui/core';
// Defaults to weight 400 with all styles included.
import './App.css';
function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(
      'https://gnews.io/api/v4/top-headlines?lang=en&token=1935443d90f6e089463789b2dd4acec3'
    )
      .then((res) => res.json())
      .then((response) => {
        setArticles(response.articles);
      });
  }, []);
  const DoSearch = () => {
    fetch(
      'https://gnews.io/api/v4/top-headlines?q=' +
        phrase +
        '&lang=en&token=1935443d90f6e089463789b2dd4acec3'
    )
      .then((res) => res.json())
      .then((response) => {
        setArticles(response.articles);
      });
  };

  const [phrase, setPhrase] = useState('');
  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'Roboto',
        backgroundColor: '#ffffff',
        color: 'black',
      }}
    >
      <br></br>
      <TextField
        id="filled-basic"
        label="Search"
        variant="filled"
        color="primary"
        style={{ marginBottom: '10px', width: '75%' }}
        value={phrase}
        type="text"
        onChange={(e) => setPhrase(e.target.value)}
      />
      <Button
        style={{ marginLeft: '10px', padding: '15px' }}
        variant="contained"
        color="default"
        onClick={DoSearch}
      >
        Search
      </Button>
      <Typography
        variant="h1"
        gutterBottom
        style={{ textAlign: 'center', margin: '20px' }}
      >
        WHAT'S NEW?
      </Typography>
      <br></br>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        {articles.map((article) => (
          <Article article={article} />
        ))}
      </div>
    </div>
  );
}

export default App;

const Article = ({ article }) => {
  return (
    <Paper
      variant="outlined"
      style={{
        width: 'auto',
        height: 'auto',
        backgroundColor: '#333333',
        marginBottom: '100px',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        marginRight: '100px',
        marginLeft: '100px',
      }}
    >
      <CardMedia image={article.image} style={{ height: '350px' }}></CardMedia>
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        {article.title} - {article.source.name}
      </Typography>
      <Typography variant="body2" gutterBottom style={{ marginTop: '20px' }}>
        {article.content}
      </Typography>
      <br></br>
      <Button color="primary">
        <a
          style={{ display: 'table-cell' }}
          href={article.source.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </Button>
    </Paper>
  );
};
