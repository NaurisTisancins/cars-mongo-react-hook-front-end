import React from 'react'
import { useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';


const styles = {
  input: {
    width: '30rem',
    margin: '1rem auto',
  }
}

function InputField({name, type}) {
  const { register } = useFormContext();
  return (
    <TextField
      sx={styles.input}
      id="filled-basic"
      label={name}
      variant="filled"
      type={type}
      {...register(name)} />
  )
}

export default InputField;
