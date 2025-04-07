import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './styles/ManagerUsers.css'


const ManageUsers = () => {
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
  

    return (
        <div>
            <div className='header-section'>
                <h2>Current Users</h2>
                <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                >
                <ToggleButton value="SELLER">Sellers</ToggleButton>
                <ToggleButton value="BUYER">Customers</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className='table-section'>

            </div>
        </div>
    );
}

export default ManageUsers;
