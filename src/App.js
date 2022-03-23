import React from 'react';

const App = () => {
    return (<div className="container">
        <div className="valid-keys">
            <span className="matched">Fili</span>
            <span className="remainder">pe</span>
        </div>
        <div className="typed-keys">abcdefilipe</div>
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