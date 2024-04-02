
import { Typography, FormControl, Select, SelectChangeEvent, MenuItem, Stack, Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CloudDownload, Settings } from '@mui/icons-material';

type Props = {
    handleBoundary: (event: SelectChangeEvent) => void
    handleTheme: (event: SelectChangeEvent) => void
    handleDataset: (event: SelectChangeEvent) => void
    handleBand: (event: SelectChangeEvent) => void
    handleStatistic: (event: SelectChangeEvent) => void
    handleDateChange: (date: Dayjs | null) => void
    handleToDateChange: (date: Dayjs | null) => void
    runAnalysis: (event:any) => void
    downloadReport: (event:any) => void
    boundaryValue: string
    themeValue: string
    datasetValue: string
    bandValue: string 
    statisticValue: string
    dateValue: Dayjs | null
    endDateValue: Dayjs | null

}

const useStyles = makeStyles({
    formControl: {
        marginTop: 0, // Adjust as needed
        marginBottom: 0, // Adjust as needed

    },
    datePicker: {
        '& .MuiInputBase-root': {
            height: '2em', // Adjust the height as needed
            width: '12.5em',
            overflowX: 'hidden',
            overflowY: 'hidden',
            fontSize: '1em',
            borderRadius: '.5em'
        },
    },
    tabLabel: {
        textTransform: 'capitalize',
        fontfamily: 'Poppins',
        fontWeight: '800',
    },
    typography: {
        fontFamily: [
            'Poppins',

            'sans-serif',
        ].join(','),
    },

});

const SelectionsPanel = ({ handleBoundary, handleDateChange, handleToDateChange, handleTheme, handleDataset, handleBand, handleStatistic,runAnalysis,downloadReport,
    boundaryValue, dateValue, themeValue, datasetValue, bandValue, statisticValue, endDateValue }: Props) => {
    const classes = useStyles();
    const options: string[] = ['user-drawn Boundary', 'geoJSON Boundary'];
    const themeOptions: string[] = ['NDVI', 'PRECIP'];
    const datasetOptions: string[] = ['MODIS', 'CHIRPS'];
    const bandOptions: string[] = ['precipitation', 'NIR'];
    const statOptions: string[] = ['Mean', 'Standard Deviation'];


    return (
        <div>
            <Typography fontFamily="Poppins" fontWeight={'bold'} > Boundary</Typography>
            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                <Select
                    labelId="select-label"
                    id="select"
                    value={boundaryValue}
                    onChange={(e) => { handleBoundary(e) }}
                    style={{ height: '2em', marginBottom: '1.5em', }}

                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Typography fontFamily="Poppins" fontWeight={'bold'} > Select Theme</Typography>
            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                <Select
                    labelId="select-label"
                    id="select"
                    value={themeValue}
                    onChange={(e) => { handleTheme(e) }}
                    style={{ height: '2em', marginBottom: '1.5em', }}

                >
                    {themeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Typography fontFamily="Poppins" fontWeight={'bold'} > Select Dataset</Typography>
            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                <Select
                    labelId="select-label"
                    id="select"
                    value={datasetValue}
                    onChange={(e) => { handleDataset(e) }}
                    style={{ height: '2em', marginBottom: '1.5em', }}

                >
                    {datasetOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography fontFamily="Poppins" fontWeight={'bold'} > Select Band</Typography>
            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                <Select
                    labelId="select-label"
                    id="select"
                    value={bandValue}
                    onChange={(e) => { handleBand(e) }}
                    style={{ height: '2em', marginBottom: '1.5em', }}

                >
                    {bandOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Typography fontFamily="Poppins" fontWeight={'bold'} marginBottom={'1em'} >Select date</Typography>

            <Stack direction="row" spacing={23} >
                <Typography fontFamily="Poppins" fontWeight={'bold'} >Start</Typography>
                <Typography fontFamily="Poppins" fontWeight={'bold'} >End</Typography>
            </Stack>


            <Stack direction="row" spacing={2} style={{ marginBottom: '2em' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                        <DatePicker

                            value={dateValue}
                            onChange={handleDateChange}
                            format="YYYY-MM-DD"
                            className={classes.datePicker}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                        <DatePicker

                            value={endDateValue}
                            onChange={handleToDateChange}
                            format="YYYY-MM-DD"
                            className={classes.datePicker}
                        />
                    </DemoContainer>
                </LocalizationProvider>

            </Stack>
            <Typography fontFamily="Poppins" fontWeight={'bold'} > Select Statistic</Typography>
            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                <Select
                    labelId="select-label"
                    id="select"
                    value={statisticValue}
                    onChange={(e) => { handleStatistic(e) }}
                    style={{ height: '2em', marginBottom: '1.5em', }}

                >
                    {statOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Stack>
                <Button size='large' variant="contained" color="success" className='mb-4'
                    startIcon={<Settings style={{ height: '1.5em', width: '1.5em' }} />}

                    style={{
                        textTransform: 'none',
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: '1em',
                        height: '3em',
                        //    whiteSpace: 'nowrap',
                        padding: '1em',
                    }}
                    onClick={runAnalysis}>
                    RUN
                </Button>
                <Button size='large' variant="contained" color="success" className='mb-4'
                    startIcon={<CloudDownload style={{ height: '1.5em', width: '1.5em' }} />}

                    style={{
                        textTransform: 'none',
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: '1em',
                        height: '3em',
                        //    whiteSpace: 'nowrap',
                        padding: '1em',
                    }}
                    onClick={downloadReport}>
                    Download Report
                </Button>


            </Stack>

        </div>
    )
}

export default SelectionsPanel