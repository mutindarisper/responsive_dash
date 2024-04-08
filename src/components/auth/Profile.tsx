import React, { useState } from 'react'
import Navigationbar from '../Navigationbar'
import '../style.css'
import { Box, Button, Stack } from '@mui/material'
import { AccountCircleOutlined, Email, MarkEmailUnread, Notifications, WatchLater } from '@mui/icons-material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { ThemeProvider, createTheme } from '@mui/material/styles';




const theme = createTheme({

    palette: {
      primary: {
        main: '#4caf50',
        // Change the primary color to green
  
  
      },
    },
  });


const Profile = () => {

    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return (
        <ThemeProvider theme={theme}>
            <Navigationbar />
            <div className="profile bg-image-profile-container  mb-5"
                style={{ width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <div className="white-bg-opacity">
                    <Stack direction={'row'} style={{ gap: '67vw', marginBottom: '20vh' }}>

                        <Stack direction={'row'} spacing={2}>
                            {/* <div className="account" style={{backgroundColor:'#fff', borderRadius:'50%', height: '10em', width: '10em',}}> */}
                            <AccountCircleOutlined style={{ height: '8em', width: '8em', marginTop: '-1.5em', fill: '#4CAF50' }} />
                            {/* </div> */}
                            <Stack>
                                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.5em' }}>User Name</p>
                                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.5em' }}>User Role</p>
                                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.5em' }}>Email</p>
                            </Stack>

                        </Stack>
                        <Button variant="contained"
                            style={{
                                textTransform: 'none',
                                fontFamily: 'Poppins',
                                fontWeight: 700,
                                fontSize: '1.5em',
                                height: '2.5em',
                                backgroundColor: '#4CAF50'
                                // padding: '1em',
                            }}

                        >
                            Edit Profile
                        </Button>


                    </Stack>

                    <Stack direction={'row'} style={{ gap: '10em', marginLeft: '5em' }}>
                        <Card sx={{ height: '40vh', width: '20vw' }}>

                            <CardContent>
                                <Stack direction={'row'} spacing={2}>
                                    <WatchLater />  <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.5em', marginTop: '-0.3em' }}> Ready requests </p>

                                </Stack>



                                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1em' }} > Hydrologic Analysis </p>

                                <Button variant="contained" size='small'
                                    style={{
                                        textTransform: 'none',
                                        fontFamily: 'Poppins',
                                        fontWeight: 700,
                                        fontSize: '1em',
                                        height: '2em',
                                        backgroundColor: '#4CAF50',
                                        marginBottom: '2em'
                                        // padding: '1em',
                                    }}

                                >
                                    View results
                                </Button>


                                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1em' }} > Hydrologic Analysis </p>
                                <Button variant="contained" size='small'
                                    style={{
                                        textTransform: 'none',
                                        fontFamily: 'Poppins',
                                        fontWeight: 700,
                                        fontSize: '1em',
                                        height: '2em',
                                        backgroundColor: '#4CAF50'
                                        // padding: '1em',
                                    }}

                                >
                                    View results
                                </Button>
                            </CardContent>

                        </Card>

                        <Card sx={{ height: '40vh', width: '20vw' }}>

                            <CardContent>
                                <Stack direction={'row'} spacing={2}>
                                    <WatchLater />  <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.5em', marginTop: '-0.3em' }}> Pending requests </p>

                                </Stack>



                                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1em' }} > Hydrologic Analysis </p>

                                <Button variant="contained" size='small'
                                    style={{
                                        textTransform: 'none',
                                        fontFamily: 'Poppins',
                                        fontWeight: 700,
                                        fontSize: '1em',
                                        height: '2em',
                                        backgroundColor: '#4CAF50',
                                        marginBottom: '2em'
                                        // padding: '1em',
                                    }}

                                >
                                    View results
                                </Button>


                                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1em' }} > Hydrologic Analysis </p>
                                <Button variant="contained" size='small'
                                    style={{
                                        textTransform: 'none',
                                        fontFamily: 'Poppins',
                                        fontWeight: 700,
                                        fontSize: '1em',
                                        height: '2em',
                                        backgroundColor: '#4CAF50'
                                        // padding: '1em',
                                    }}

                                >
                                    View results
                                </Button>
                            </CardContent>

                        </Card>

                        <Card sx={{ height: '40vh', width: '20vw' }}>

                            <CardContent>
                                <Stack direction={'row'} spacing={1}>
                                    <Notifications />  <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.5em', marginTop: '-0.3em' }}> Notifications </p>

                                </Stack>

                                <TabContext value={value} >

                                    <TabList onChange={handleChange} style={{ display:'flex', flexDirection:'row', gap:'8em' }} >
                                        {/* <Stack direction={'row'} style={{gap:'4em'}}> */}
                                        <Tab icon={<Email style={{ height: '1.5em', width: '2em'}} />} iconPosition='start' label={<Typography fontFamily="Poppins" textTransform={'none'} fontSize={'1.2em'} color={'#4CAF50'} >All</Typography>} value="1" />
                                        <Tab icon={<MarkEmailUnread style={{ height: '1.5em', width: '2em'}} />} iconPosition='start' label={<Typography fontFamily="Poppins" textTransform={'none'} fontSize={'1.2em'} color={'#4CAF50'} >Unread</Typography>} value="2" />
                                      

                                        {/* </Stack> */}
                                        
                                    </TabList>

                                    <TabPanel value="1" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                                        all messages
                                    </TabPanel>

                                    <TabPanel value="2" style={{ fontFamily: 'Poppins', }}>unread messages</TabPanel>
                                </TabContext>




                            </CardContent>

                        </Card>

                    </Stack>

                </div>


            </div>
        </ThemeProvider>
    )
}

export default Profile