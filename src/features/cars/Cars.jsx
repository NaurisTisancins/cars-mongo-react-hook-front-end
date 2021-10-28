import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCars,
  selectCars,
  changeTitle,
} from './carsSlice';

import CarCard from './CarCard';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const styles = {
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80vw',
    margin: '0 auto',
  },
}

function Cars() {
  const cars = useSelector(selectCars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
    dispatch(changeTitle('Cars'));
  }, []);

  return (
    <Box sx={styles.flexContainer}>
      <Grid
        container
        spacing={2}>
        {cars.map((car) => {
          return (
            <Grid
              item
              xs={6}
              md={6}
              lg={4}
              key={car._id}
            >
              <CarCard props={car}/>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default Cars
