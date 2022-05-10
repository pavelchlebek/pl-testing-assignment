import React from 'react';

import { Slider } from '@mui/material';

import classes from './App.module.css';
import { ReactComponent as Action } from './assets/icon-action.svg';
import { ReactComponent as ExpandIcon } from './assets/icon-expand.svg';
import { ReactComponent as Logo } from './assets/logo.svg';
import { CaravanCard } from './components/CaravanCard/CaravanCard';
import { CaravanType } from './components/CaravanType/CaravanType';
import data from './data/data.json';

const caravans = data.items

const caravanTypes = [
  {
    title: "Campervan",
    description: "Obytka s rozměry osobáku, se kterou dojedete všude.",
    id: "Campervan",
  },
  {
    title: "Integrál",
    description: "Král mezi karavany. Luxus na kolech.",
    id: "Intergrated",
  },
  {
    title: "Vestavba",
    description: "Celý byt geniálně poskládaný do dodávky.",
    id: "BuiltIn",
  },
  {
    title: "Přívěs",
    description: "Tažný karavan za vaše auto. Od kapkovitých až po rodinné.",
    id: "Alcove",
  },
]

function App() {
  const [price, setPrice] = React.useState([1200, 7600])
  const [type, setType] = React.useState("Intergrated")
  const [instantBookable, setInstantBookable] = React.useState(true)

  const [displayedCaravans, setDisplayedCaravans] = React.useState(caravans)
  const [resultsDisplayed, setResultDisplayed] = React.useState(6)

  React.useEffect(() => {
    const filteredCaravans = caravans
      .filter((caravan) => caravan.price >= price[0] && caravan.price <= price[1])
      .filter((caravan) => caravan.vehicleType === type)
    if (instantBookable) {
      const onlyInstantBookable = filteredCaravans.filter(
        (caravan) => caravan.instantBookable === true
      )
      setDisplayedCaravans(onlyInstantBookable)
    } else {
      setDisplayedCaravans(filteredCaravans)
    }
  }, [price, type, instantBookable])

  React.useEffect(() => {
    setResultDisplayed(6)
  }, [price, instantBookable, type])

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
        <div className={classes.type}>
          <div className={classes.typeHeading}>Typ karavanu</div>
          <div className={classes.caravanChoice}>
            {caravanTypes.map((caravan, index) => {
              return (
                <CaravanType
                  key={index}
                  active={type === caravan.id}
                  description={caravan.description}
                  onClick={() => setType(caravan.id)}
                  title={caravan.title}
                />
              )
            })}
          </div>
        </div>
        <div className={classes.instantBookable}>
          <div className={classes.instantHeading}>
            <div className={classes.headingText}>Okamžitá rezervace</div>
            <Action className={classes.actionIcon} />
          </div>
          <div
            className={classes.instantToggle}
            onClick={() => setInstantBookable((prev) => !prev)}
          >
            <div className={classes.instantValue}>{instantBookable ? "Ano" : "Ne"}</div>
            <ExpandIcon className={classes.expandIcon} />
          </div>
        </div>
      </div>
      <div className={classes.results}>
        {displayedCaravans.slice(0, resultsDisplayed).map((caravan, index) => {
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
        {displayedCaravans.length > resultsDisplayed && (
          <button className={classes.button} onClick={() => setResultDisplayed((prev) => prev + 6)}>
            Načíst Další
          </button>
        )}
      </div>
    </div>
  )
}

export default App
