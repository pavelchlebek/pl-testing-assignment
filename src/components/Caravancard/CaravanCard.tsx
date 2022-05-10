import React from 'react';

import { ReactComponent as Action } from '../../assets/icon-action.svg';
import { ReactComponent as Bed } from '../../assets/icon-bed.svg';
import { ReactComponent as Person } from '../../assets/icon-person.svg';
import { ReactComponent as Shower } from '../../assets/icon-shower.svg';
import { ReactComponent as Toilet } from '../../assets/icon-toilet.svg';
import classes from './CaravanCard.module.css';

interface IProps {
  vehicleType: string
  name: string
  location: string
  pictureUrl: string
  passengersCapacity: number
  sleepCapacity: number
  instantBookable: boolean
  price: number
  toilet: boolean
  shower: boolean
}

const getType = (vehicleType: string) => {
  if (vehicleType === "Intergrated") return "Integrál"
  if (vehicleType === "Campervan") return "Campervan"
  if (vehicleType === "BuiltIn") return "Vestavba"
  if (vehicleType === "Alcove") return "Příves"
}

export const CaravanCard: React.FC<IProps> = ({
  vehicleType,
  instantBookable,
  location,
  name,
  passengersCapacity,
  pictureUrl,
  price,
  shower,
  sleepCapacity,
  toilet,
}) => {
  return (
    <div className={classes.container}>
      <img className={classes.picture} src={pictureUrl} alt={name} />
      <div className={classes.details}>
        <div className={classes.vehicle}>
          <h4 className={classes.type}>{getType(vehicleType)}</h4>
          <h3 className={classes.name}>{name}</h3>
        </div>
        <div className={classes.parameters}>
          <h5 className={classes.location}>{location}</h5>
          <div className={classes.icons}>
            <Person className={classes.icon} />
            <span className={classes.count}>{passengersCapacity}</span>
            <Bed className={classes.icon} />
            <span className={classes.count}>{sleepCapacity}</span>
            {toilet && <Toilet className={classes.icon} />}
            {shower && <Shower className={classes.icon} />}
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.price}>Cena od</div>
          <div className={classes.amount}>
            <div className={classes.amountText}>{`${price} Kč/den`}</div>
            {instantBookable && <Action className={classes.instant} />}
          </div>
        </div>
      </div>
    </div>
  )
}
