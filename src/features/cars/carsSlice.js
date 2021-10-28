import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCars, addCar, removeCar, updateCar } from './CarsAPI';

const initialState = {
  cars: [],
  car: {},
  title: 'Cars',
  status: 'idle',
  error: null,
};//initialState

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async () => {
    const response = await getCars();
    console.log('GET CARS response', response);
    return response;
  }
);//fetchCars

export const postCar = createAsyncThunk(
  'cars/postCar',
  async (carData) => {
    const response = await addCar(carData);
    console.log('ADD CAR response', response);
    return response;
  }
);//postCar

export const deleteCar = createAsyncThunk(
  'cars/deleteCar',
  async (id) => {
    await removeCar(id);
    return id;
  }
);//deleteCar

export const putCar = createAsyncThunk(
  'cars/putCar',
  async ([id, data]) => {
    console.log(id, data)
    await updateCar(id, data);
    return [id, data];
  }
); //putCar

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder//fetchCars
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'errored';
        state.error = action.error.message;
      })

    builder//postCar
      .addCase(postCar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postCar.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cars.push(action.payload);
      })
      .addCase(postCar.rejected, (state, action) => {
        state.status = 'errored';
        state.error = action.error.message;
      })
    
    builder//deleteCar
      .addCase(deleteCar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.status = 'idle';
        const idx = state.cars.findIndex(({ _id }) => {
          return _id === action.payload;
        });
        state.cars = [...state.cars.slice(0, idx), ...state.cars.slice(idx + 1)];
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.status = 'errored';
        state.error = action.error.message;
      })

    builder
      .addCase(putCar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(putCar.fulfilled, (state, action) => {
        state.status = 'idle';
        const [id, changes] = action.payload;
        const idx = state.cars.findIndex((car) => car._id === id);
        state.cars[idx] = {
          ...state.cars[idx],
          ...changes,
        };
      })
      .addCase(putCar.rejected, (state, action) => {
        state.status = 'errored';
        state.error = action.error.message;
      })
  }
});


export const selectCars = (state) => state.cars.cars;
export const selectTitle = (state) => state.cars.title;
export const selectStatus = (state) => state.cars.status;
export const selectError = (state) => state.cars.error;

export const { changeTitle } = carsSlice.actions;

export default carsSlice.reducer;