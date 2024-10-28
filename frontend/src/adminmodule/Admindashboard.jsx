import Navadmin from './Navadmin';
import { Button, Box, Typography, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Admindashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/view")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const delValue = (id) => {
    axios
      .delete(`http://localhost:3000/remove/${id}`)
      .then((res) => {
        alert(res.data.message);
        setJobs(jobs.filter(job => job._id !== id)); // Update local state
      })
      .catch((err) => {
        console.error(err);
      });
    handleClose();
  };

  const updateValue = (val) => {
    navigate("/manjob", { state: { val } });
  };

  const handleClickOpen = (id) => {
    setJobToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setJobToDelete(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="adminn">
      <div className="nav">
        <Navadmin />
        <br />
        <Typography variant='h4'>List of All Jobs</Typography>
        <br /><br />
        <Box display="flex" flexWrap="wrap" justifyContent="space-around">
          {jobs.map((val, i) => (
            <Box 
              key={i} 
              sx={{ 
                border: '1px solid #ccc', 
                borderRadius: '8px', 
                padding: '16px', 
                margin: '8px', 
                width: '300px', 
                boxShadow: 2 
              }}
            >
              <Typography variant="h6">{val.Jobname}</Typography>
              <Typography variant="body1">Company: {val.Description}</Typography>
              <Typography variant="body1">Requirements: {val.Reqirements}</Typography>
              <Typography variant="body1">Location: {val.Location}</Typography>
              <Typography variant="body1">Salary: {val.Salary}</Typography>
              <Typography variant="body1">Job Type: {val.Jobtype}</Typography>
              <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Button size='small' variant='contained' onClick={() => { updateValue(val); }}>Update</Button>
                <Button size='small' variant='contained' onClick={() => handleClickOpen(val._id)}>Delete</Button>
              </Box>
            </Box>
          ))}
        </Box>
        <br /><br />
        <Link to='/manjob'>
          <Button variant='contained'>Add Job</Button>
        </Link>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this job? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={() => delValue(jobToDelete)} color="primary">Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Admindashboard;
