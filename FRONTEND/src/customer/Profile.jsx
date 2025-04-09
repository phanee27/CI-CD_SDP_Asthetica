import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Avatar,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Profile = () => {
  const fixedInputSx = {
    width: '250px',
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        margin: 'auto',
        mt: 4,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#fff'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Personal info
      </Typography>
      <Typography variant="body2" mb={3}>
        Customize how your profile information will appear to the networks.
      </Typography>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={3}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              alt="Profile"
              src="https://via.placeholder.com/100"
              sx={{ width: 80, height: 80 }}
            />
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#eee',
                border: '1px solid #ccc'
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} sm={9}>
          <Grid container spacing={2}>
            <Grid item>
              <TextField label="First name" variant="outlined" sx={fixedInputSx} />
            </Grid>
            <Grid item>
              <TextField label="Last name" variant="outlined" sx={fixedInputSx} />
            </Grid>
            <Grid item>
              <TextField
                label="Role"
                defaultValue="UI Developer"
                variant="outlined"
                sx={fixedInputSx}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                defaultValue="siriwatk@test.com"
                variant="outlined"
                sx={fixedInputSx}
              />
            </Grid>
            <Grid item>
              <FormControl sx={fixedInputSx}>
                <InputLabel>Country</InputLabel>
                <Select defaultValue="Thailand" label="Country">
                  <MenuItem value="Thailand">Thailand</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={fixedInputSx}>
                <InputLabel>Timezone</InputLabel>
                <Select
                  defaultValue="Indochina Time (Bangkok)"
                  label="Timezone"
                  startAdornment={<AccessTimeIcon sx={{ mr: 1 }} />}
                >
                  <MenuItem value="Indochina Time (Bangkok)">
                    Indochina Time (Bangkok) — GMT+07:00
                  </MenuItem>
                  <MenuItem value="IST">India Standard Time — GMT+05:30</MenuItem>
                  <MenuItem value="EST">Eastern Standard Time — GMT-05:00</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button variant="text" sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button variant="contained">Save</Button>
      </Box>
    </Box>
  );
};

export default Profile;
