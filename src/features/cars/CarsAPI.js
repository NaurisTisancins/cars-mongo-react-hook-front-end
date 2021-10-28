const URL = "/api/v1/cars/";

export async function getCars() {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      }
    });
    if (!response.ok) throw response;
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};//getCars

export async function addCar(carData) {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) throw response;
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};//addCar

export async function removeCar(id) {
  try {
    const response = await fetch(`${URL}${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) throw response;
    return id;
  } catch (err) {
    console.log(err);
  }
};//removeCar

export async function updateCar(id, data) {
  console.log(`${URL}update/${id}`)
  try {
    const response = await fetch(`${URL}update/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if(!response.ok) throw response;
    return [id, data];
  } catch (err) {
    console.log(err);
  }
}; //updateCar