import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react'
import { getpartExpenseAPI } from '../../utilities/useAPI';
import { useSelector } from 'react-redux';
import TextInput from '../../Elements/TextInput';


export default function GetParExpenses() {

  const { userId } = useSelector((state) => (state.authreducer))

  const initialState = {
    userId: userId,
    startDate: "",
    endDate: "",
  }

  const [values, setValues] = useState(initialState)

  const [selectedlist, setSelectedlist] = useState(initialState);

  const handleChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values) {
      fetch("https://backend-fintech-user-app.onrender.com/api/expenses/selectedlist", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          if (result.success) {
            sessionStorage.setItem("_tk", result.token);
            console.log(result);
            console.log(values);
            setSelectedlist(result.data)

          } else {

          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

  };


  return (
    <div>
      <Box>
        <Typography variant='h5'>
        Selected Transactions
        </Typography>
      </Box>
      <Box sx={{ width: 300 }}>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Date of expense"
            id="startDate"
            name="startDate"
            placeholder="Select Date of expense"
            type="date"
            value={values["startDate"]}
            onChange={handleChange}
            
          />
          <TextInput
            label="Date of expense"
            id="endDate"
            name="endDate"
            placeholder="Select Date of expense"
            type="date"
            value={values["endDate"]}
            onChange={handleChange}
          />
          <Button type='submit'>
            Search
          </Button>
        </form>
      </Box>
      <Box>
        {/* {selectedlist &&
          selectedlist.map((dataObj, index) => {
            return (
              <div
                style={{
                  width: "auto",
                  backgroundColor: "grey",
                  padding: "5px 25px",
                  borderRadius: 10,
                  marginBlock: 10,

                }}
                key={dataObj.index}
              >
                <Grid container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <p style={{ fontSize: 20, color: 'white' }}>{dataObj.category}</p>
                  <p style={{ fontSize: 20, color: 'white' }}>{dataObj.transactiontype}</p>
                </Grid>
                <Grid container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <p style={{ fontSize: 20, color: 'white' }}>{dataObj.date}</p>
                  <p style={{ fontSize: 20, color: 'white' }}>Rs{dataObj.amount}</p>
                </Grid>
              </div>
            );
          })} */}
      </Box>

    </div>
  )
}
