import React, { useEffect, useState } from 'react';
import wordList from '../src/resources/words.json';

const maxTypedKeys = 30;

const getWord = () => {
    const index = Math.floor(Math.random() * wordList.length);
    const word = wordList[index];
    return word;
}

const isValidKey = (key, word) => {
    if (!word) return false;
    const result = word.split('').includes(key);
    return result;
}

const Word = ({ word, validKeys }) => {
    if (!word) return null;
    const joinedKeys = validKeys.join('');
    const matched = word.slice(0, joinedKeys.length);
    const remainder = word.slice(joinedKeys.length)

    return (<>
        <span className="matched">{matched}</span>
        <span className="remainder">{remainder}</span>
    </>)
}

const App = () => {

    const [typedKeys, setTypedKeys] = useState([]);
    const [validKeys, setValidKeys] = useState([]);
    const [completedWords, setCompletedWords] = useState([]);
    const [word, setWord] = useState('');

    useEffect(() => {
        setWord(getWord);
    }, []);

    useEffect(() => {
        const wordFromValidKeys = validKeys.join('');
        if (word && word == wordFromValidKeys) {

            let newWord = null;

            do {
                newWord = getWord();
            } while (completedWords.includes(newWord));

            setWord(newWord);
            setValidKeys([]);
            setCompletedWords((prevTypedKeys) => [...prevTypedKeys, word]);
            setTypedKeys([]);
        }
    }, [word, validKeys, completedWords])

    const handleKeyDown = (event) => {
        event.preventDefault();
        const { key } = event;

        setTypedKeys((prevTypedKeys) => {
            return [...prevTypedKeys, key].slice(maxTypedKeys * -1);
        })

        if (isValidKey(key, word)) {
            setValidKeys((prevTypedKeys) => {
                const isValidLength = prevTypedKeys.length <= word.length;
                const isNextChar = isValidLength && word[prevTypedKeys.length] == key;

                console.log("prevValidKeys", prevTypedKeys, prevTypedKeys.length);
                console.log('word', word);
                console.log('isNextChar', isNextChar, key)

                return isNextChar ? [...prevTypedKeys, key] : prevTypedKeys;
            })
        }

        console.log("key", key);
    };

    return (<div className="container" tabIndex="0" onKeyDown={handleKeyDown}>
        <div className="valid-keys">
            <Word word={word} validKeys={validKeys} />

        </div>
        <div className="typed-keys">{typedKeys ? typedKeys.join(' ') : null}</div>
        <div className="completed-words">
            <ol>
                {completedWords.map((word) => {

                    return (<li key={word}>{word}</li>)
                }
                )}
            </ol>
        </div>
    </div>);
};

export default App;