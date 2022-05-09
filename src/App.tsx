import React from 'react';

import { Slider } from '@mui/material';

import classes from './App.module.css';
import { ReactComponent as Logo } from './assets/logo.svg';
import { CaravanCard } from './components/Caravancard/CaravanCard';
import data from './data/data.json';

const caravans = data.items.slice(0, 7)

function App() {
  const [price, setPrice] = React.useState([1200, 7600])

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (Array.isArray(newValue)) {
      setPrice(newValue)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Logo className={classes.logo} />
      </div>
      <div className={classes.controls}>
        <div className={classes.slider}>
          <div className={classes.priceLabel}>Cena za den</div>
          <Slider
            valueLabelDisplay="auto"
            size="small"
            value={price}
            onChange={handleChange}
            min={100}
            max={10000}
            step={100}
          />
          <div className={classes.priceRange}>
            <div className={classes.priceLimit}>
              <h5 className={classes.priceLimitAmount}>{price[0]}</h5>
              <div className={classes.currency}>Kč</div>
            </div>
            <div className={classes.priceLimit}>
              <h5 className={classes.priceLimitAmount}>{price[1]}</h5>
              <div className={classes.currency}>Kč</div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.results}>
        {caravans.map((caravan, index) => {
          return (
            <CaravanCard
              key={index}
              vehicleType={caravan.vehicleType}
              instantBookable={caravan.instantBookable}
              location={caravan.location}
              name={caravan.name}
              passengersCapacity={caravan.passengersCapacity}
              pictureUrl={caravan.pictures[0]}
              price={caravan.price}
              shower={caravan.shower}
              sleepCapacity={caravan.sleepCapacity}
              toilet={caravan.toilet}
            />
          )
        })}
      </div>
      <div className={classes.footer}>
        <button className={classes.button} onClick={() => {}}>
          Načíst Další
        </button>
      </div>
    </div>
  )
}

export default App
