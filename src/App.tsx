import React from 'react';

import data from './data/data.json';

function App() {
  return (
    <div>
      {data.items[0].pictures.map((item, index) => {
        return <img style={{ width: "150px", height: "150px" }} key={index} src={item} alt="img" />
      })}
    </div>
  )
}

export default App
