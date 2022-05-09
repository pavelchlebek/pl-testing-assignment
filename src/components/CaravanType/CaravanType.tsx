import React from 'react';

import classes from './CaravanType.module.css';

interface IProps {
  title: string
  description: string
  active: boolean
  onClick: () => void
}

export const caravanType: React.FC<IProps> = ({ active, description, onClick, title }) => {
  return (
    <div
      onClick={onClick}
      className={active ? classes.wrapper + " " + classes.active : classes.wrapper}
    >
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.description}>{description}</p>
    </div>
  )
}
