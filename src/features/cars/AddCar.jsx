import React, { useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useForm, FormProvider} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from './formInputs/InputField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useSelector, useDispatch } from 'react-redux';
import {
  changeTitle,
  selectCars,
  postCar,
  putCar,
} from './carsSlice';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonBox: {
    margin: '1rem auto',
    width: '40rem',
    display: 'flex',
    justifyContent: 'center',

    alignItems: 'center',
  },
  button: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    margin: '1rem 0.5rem',
  },

}

const schema = yup.object().shape({
  name: yup.string().required(),
  bhp: yup.number().positive().integer().required(),
  avatar_url: yup.string(),
});

function AddCar() {

  const cars = useSelector(selectCars);
  // const [car, setCar] = useState({});
  const {id} = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(schema),
  })
  const isAddMode = !id;

  useEffect(() => {
    if(!isAddMode) {
      dispatch(changeTitle('Update Car'))
    } else {
      dispatch(changeTitle('Add Car'));
    }
  }, [])

  useEffect(() => {
    if (!isAddMode) {
      let idx = cars.findIndex((car) => car._id === id);
      let selectedCar = cars[idx]; 
      const fields = ['name', 'bhp', 'avatar_url'];
      fields.forEach(field => methods.setValue(field, selectedCar[field]));
      // setCar(selectedCar);
    }
  }, []);


  const onSubmit = data => {
    if(!isAddMode) {
      dispatch(putCar([id, data]));
    } else {
      dispatch(postCar(data));
    };
      methods.reset();
      history.push('/');
  };

  return (
    <FormProvider {...methods} >
      <Box
        sx={styles.form}
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField
          name="name"
          type="text"
         
        />
        <InputField
          name="bhp"
          type="number"
        />
        <InputField
          name="avatar_url"
          type="text"
        />

        <Box sx={styles.buttonBox}>
          <Button
            sx={styles.button}
            variant="contained"
            type="submit"
            color="primary"
            size="medium"
          >submit</Button>
          <Button
            sx={styles.button}
            variant="outlined"
            color="error"
            size="medium"
          >Reset</Button>

        </Box>
      </Box>
    </FormProvider>
  )
}

export default AddCar
