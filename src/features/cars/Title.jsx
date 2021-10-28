import React from 'react';
import '../../App.css';

import { useSelector} from 'react-redux';
import {
  selectTitle,
} from './carsSlice';

function Title() {
  const title = useSelector(selectTitle);
  return (
    <div >
      <h1 className="mainTitle">{title}</h1>
    </div>
  )
}

export default Title
