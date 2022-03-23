import React, { useState } from 'react';

const maxTypedKeys = 30;

const App = () => {

    const [typedKeys, setTypedKeys] = useState([]);

    const handleKeyDown = (event) => {
        event.preventDefault();
        const { key } = event;

        setTypedKeys((prevTypedKeys) => {
            return [...prevTypedKeys, key].slice(maxTypedKeys * -1);
        })
        console.log("key", key);
    };

    return (<div className="container" tabIndex="0" onKeyDown={handleKeyDown}>
        <div className="valid-keys">
            <span className="matched">Fili</span>
            <span className="remainder">pe</span>
        </div>
        <div className="typed-keys">{typedKeys ? typedKeys.join(' ') : null}</div>
        <div className="completed-words">
            <ol>
                <li>Bombeiro</li>
                <li>Porta</li>
                <li>Cachorro</li>
                <li>Pedra</li>
            </ol>
        </div>
    </div>);
};

export default App;