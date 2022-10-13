import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Student() {
    const paperstyle = {padding: '50px 20px', width:600, margin:'20px auto'}
    // catch the type-in information
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [address, setAddress] = React.useState('')
    // const [id, setID] = React.useState('')

    const [students, setStudents] = React.useState('')

    const handleClick = (e) => {
        e.preventDefault()
        const student = {address, firstName, lastName}
        console.log(student)
        fetch("http://localhost:8080/student/add", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(student)
        }).then(() => {
            console.log("new student added")
        })
    }

    React.useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
        .then(res => res.json())
        .then((result) => {
            setStudents(result);
        })
    }, [])


  return (
    <Container>
    <Paper elevation={3} style={paperstyle}>
        <h1 style={{color:"black"}}>Add Student</h1>

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth
      value = {firstName}
      onChange = {(e) => setFirstName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Last Name" variant="outlined" fullWidth
      value = {lastName}
      onChange = {(e) => setLastName(e.target.value)}
      />
      {/* <TextField id="outlined-basic" label="Student ID" variant="outlined" fullWidth
      value = {id}
      onChange = {(e) => setID(e.target.value)}
      /> */}
      <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth
      value = {address}
      onChange = {(e) => setAddress(e.target.value)}
      />

      <Button variant="contained" onClick={handleClick}>Submit</Button>
    </Box>
    
    </Paper>
    
    {/* Show all information */}
    {/* <h1>All Students Information</h1>
      <Paper elevation={3} style = {paperstyle}>
        {students.map(student =>(
            <Paper elevation={2} style = {{margin:"10px", padding:"15px", textAlign:"left"}} key = {student} >
                {student.firstName} {student.lastName} <br/>
                {student.address}
            </Paper>
        ))}
    </Paper> */}
    


    </Container>
  );
}
