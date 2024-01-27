import React, { useState } from 'react';
import "./Home.css";

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [isWordInput, setIsWordInput] = useState(true);

  const calculateMetrics = () => {
    const characters = inputText.length;
    const words = inputText.split(/\s+/).filter(word => word.length > 0);

    if (isWordInput) {
      return {
        characters,
        words: words.length,
      };
    } else {
      const sentences = inputText.split(/[.!?]/).filter(sentence => sentence.length > 0);
      const paragraphs = inputText.split('\n').filter(paragraph => paragraph.length > 0);
      const spaces = inputText.split(' ').length - 1;
      const punctuations = inputText.replace(/[a-zA-Z0-9\s]/g, '').length;

      return {
        characters,
        words: words.length,
        sentences: sentences.length,
        paragraphs: paragraphs.length,
        spaces,
        punctuations,
      };
    }
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);

    const metrics = calculateMetrics(newText);
    console.log(metrics);
  };

  const handleInputTypeChange = (type) => {
    setIsWordInput(type === 'word');
    setInputText(''); // Clear input when switching types
  };

  return (
    <div>
      <h1>Text Analyzer</h1>
      Text Analyzer is a simple free online tool for SEO web content analysis that helps you find most frequent phrases and words, number of characters, words, sentences, and paragraphs, and estimated read and speak time of your content.
      <br />
      <div className="shift">
        <button className={`btn btn-light ${isWordInput ? 'active' : ''}`} onClick={() => handleInputTypeChange('word')}>Word Input</button>
        <button className={`btn btn-light ${!isWordInput ? 'active' : ''}`} onClick={() => handleInputTypeChange('paragraph')}>Paragraph Input</button>
      </div>

      {isWordInput ? (
        <label htmlFor="textInput"></label>
      ) : (
        <div/>
      )}

      <textarea
        id="textInput"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type your text here..."
      />

      <div className='card'>
        <table border={0}>
          <tbody>
            <tr>
              <th>Characters</th>
              <th>Words</th>
              {!isWordInput && (
                <>
                  <th>Sentences</th>
                  <th>Paragraphs</th>
                  <th>Spaces</th>
                  <th>Punctuations</th>
                </>
              )}
            </tr>
            <tr>
              <td>{calculateMetrics().characters}</td>
              <td>{calculateMetrics().words}</td>
              {!isWordInput && (
                <>
                  <td>{calculateMetrics().sentences}</td>
                  <td>{calculateMetrics().paragraphs}</td>
                  <td>{calculateMetrics().spaces}</td>
                  <td>{calculateMetrics().punctuations}</td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
