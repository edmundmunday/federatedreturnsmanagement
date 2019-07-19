// import React from React
import React from 'react';

// import AppBar, Toolbar, and Typography from Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Import the navigation component
import Navigation from '../Navigation';

// Define the "NavBar" component
const NavBar = () => {
    return(
        
        {/* create the div wrapper for the app bar */},
        <div>

            {/* inject the appbar component */}
            <AppBar color="primary" position="static">

                {/* inject the toolbar component */}
                <Toolbar>

                    {/* Create the Header with a typography component */}
                    <Typography variant="title" color="inherit">My Header</Typography>

                    {/* inject the Navigation component */}
                    <Navigation />

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;