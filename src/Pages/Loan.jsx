import React, { useState } from 'react'
import Select from '../Elements/Select'
import TextInput from '../Elements/TextInput'
import { Loancategory, transactiontype } from '../Constants/Constants';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { addLoanAPI } from '../utilities/useAPI';
import { useSelector } from 'react-redux';
import GetLoan from '../components/Output/GetLoan';

export default function Loan() {
  const { userId } = useSelector((state) => (state.authreducer))

  const initialState = {
    userId: userId,
    transactiontype: "",
    category: "",
    description: "",
    date: "",
    amount: 0,
  }

  const [values, setValues] = useState(initialState);


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
      fetch(addLoanAPI, {
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
            resetForm(e);
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

  };

  const resetForm = (e) => {
    e.preventDefault();
    setValues(initialState);
  };

  return (
    <div>
      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box>
                <form onSubmit={handleSubmit}>

                  <Select
                    label="Select Transaction type"
                    id="transactiontype"
                    name="transactiontype"
                    value={values?.transactiontype}
                    onChange={handleChange}
                    options={transactiontype}
                  />
                  <Select
                    label="Select Category"
                    id="category"
                    name="category"
                    value={values?.category}
                    onChange={handleChange}
                    options={Loancategory}
                  />
                  <TextInput
                    label="Description"
                    id="description"
                    name="description"
                    type="text"
                    value={values["description"]}
                    placeholder="Enter Description"
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Date of Loan"
                    id="date"
                    name="date"
                    placeholder="Select Date of Loan"
                    type="date"
                    value={values["date"]}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Loan amount"
                    id="amount"
                    name="amount"
                    type="number"
                    value={values["amount"]}
                    placeholder="Enter Loan Amount"
                    onChange={handleChange}
                  />
                  <Button type="submit" variant="outlined">
                    Add Loan
                  </Button>
                  <Button variant="outlined"
                    onClick={resetForm}
                  >
                    Reset Form
                  </Button>
                </form>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h5'>
                All Loans
              </Typography>
              <Box
                sx={{
                  width: 'auto',
                  height: 500,
                  overflow: 'auto'
                }}
              >
                <GetLoan />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}
