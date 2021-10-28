import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCar } from './carsSlice';


const styles = {
  cardActions: {
    display: 'flex',
    justifyContent: 'space-around',
  }
}

export default function OutlinedCard({props}) {
  const { _id, name, bhp, avatar_url } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (id) => {
    dispatch(deleteCar(id));
    history.push('/');
  };
  
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardMedia
            component="img"
            height="150"
            image={`${avatar_url}`}
            alt={`${name}`}
          />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Car Name
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">
            {`bhp: ${bhp}`}
          </Typography>
        </CardContent>
        <CardActions sx={styles.cardActions}>
          <NavLink
            exact
            to={`/update/${_id}`}
            style={{textDecoration: 'none'}}
          >
            <Button
              color="primary"
              size="small">update</Button>
          </NavLink>
            <Button
              onClick={() => handleDelete(_id)}
              color="error"
              size="small">delete</Button>
        </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
