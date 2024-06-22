import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography, styled } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';

export const StepperWrapper = styled(Box)`
    padding: 0 80px;
    width: 100%;

    @media (max-width: 991px) {
        padding: 0 15px;
    }

    .main_title{
        margin-bottom: 30px;
    }


`

const StepperPage = () => {




    const initialAnsweState = {
        answer1: null,
        answer2: null,
        answer3: null,
        answer4: null,
    };

    const [answer, setAnswer] = useState(initialAnsweState);


    const handleAnswerChange = (e) => {
        setAnswer({ ...answer, [e.target.name]: e.target.value });
        console.log(answer);

    }


    const [fullName, setFullName] = React.useState("");
    const [dateOfBirth, setDateOfBirth] = React.useState(null);
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const [radioErr, setRadioErr] = useState(false);
    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePhone = (phone) => {
        return /^\d{10}$/.test(phone);
    };




    const validateFields = () => {
        let tempErrors = {};

        if (!fullName) tempErrors.fullName = "Full Name is required.";
        if (!dateOfBirth) tempErrors.dateOfBirth = "Date of Birth is required.";
        if (!phone) tempErrors.phone = "Phone number is required.";
        else if (!validatePhone(phone)) tempErrors.phone = "Phone number is not valid.";
        if (!email) tempErrors.email = "Email is required.";
        else if (!validateEmail(email)) tempErrors.email = "Email is not valid.";


        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const steps = ['Answer Questions', 'Fill Form'];
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        console.log(radioErr);
        console.log(answer);
        if (activeStep === 0 && radioErr === false) {
            // if (answer.answer1 !== null) {
            //     setRadioErr(false)
            // } else if (answer.answer2 !== null) {
            //     setRadioErr(false)
            // } else if (answer.answer3 !== null) {
            //     setRadioErr(false)
            // } else if (answer.answer4 !== null) {
            //     setRadioErr(false)
            // } else {
            //     setRadioErr(true)
            // }
            // return;

        }
        if (activeStep === 1 && !validateFields()) {
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleSubmit = () => {
        if (!validateFields()) {
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        var data = {
            "fields": [
                {
                    "name": "question_1",
                    "value": answer.answer1
                },
                {
                    "name": "question_2",
                    "value": answer.answer2
                },
                {
                    "name": "question_3",
                    "value": answer.answer3
                },
                {
                    "name": "question_4",
                    "value": answer.answer4
                },
                {
                    "name": "full_name",
                    "value": fullName
                },
                {
                    "name": "date_of_birth",
                    "value": dateOfBirth
                },
                {
                    "name": "phone",
                    "value": phone
                },
                {
                    "name": "email",
                    "value": email
                },

            ],
        }

        // axios({
        //     method: 'post',
        //     url: `https://api.hsforms.com/submissions/v3/integration/submit/${'43592916'}/${'49715623-b50f-444b-b38e-61df1191ffb0'}`,
        //     data: JSON.stringify(data), // you are sending body instead
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        // })
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <StepperWrapper>
            <Box className="stepperInner">
                <Typography variant='h2' className='main_title'>Form Title</Typography>

                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1, pt: 4, fontWeight: 600, fontSize: 22 }} textAlign={'center'}>
                            Form submitted successfully.
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 2 }}>
                            <Button variant="contained" onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {activeStep === 0 ?
                            <Box className="stepOne stepBox">
                                <Box className="eachQuestion">
                                    <FormControl error={!!errors.answer}>
                                        <FormLabel >Question One</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="question-one-label"
                                            name="answer1"
                                            onChange={(e) => { setAnswer({ ...answer, [e.target.name]: e.target.value }); answer.answer1 !== null ? setRadioErr(true) : setRadioErr(false); }}

                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                        {
                                            radioErr === true ? "Please answer the question" : ""
                                        }
                                    </FormControl>
                                </Box>

                                {
                                    answer.answer1 === "yes" &&
                                    <Box className="eachQuestion">
                                        <FormControl>
                                            <FormLabel >Sub Question 1 : Question 1</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="question-one-label"
                                                name="answer2"
                                                onChange={(e) => { setAnswer({ ...answer, [e.target.name]: e.target.value }); answer.answer2 !== null ? setRadioErr(true) : setRadioErr(false); }}
                                            >
                                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="no" control={<Radio />} label="No" />
                                            </RadioGroup>
                                            {
                                                radioErr === true ? "Please answer the question" : ""
                                            }
                                        </FormControl>
                                    </Box>
                                }
                                {
                                    answer.answer2 === "yes" &&
                                    <Box className="eachQuestion">
                                        <FormControl>
                                            <FormLabel >Sub Question 2 : Question 1</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="question-one-label"
                                                name="answer3"
                                                onChange={(e) => { setAnswer({ ...answer, [e.target.name]: e.target.value }); answer.answer3 !== null ? setRadioErr(true) : setRadioErr(false); }}
                                            >
                                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="no" control={<Radio />} label="No" />
                                            </RadioGroup>
                                            {
                                                radioErr === true ? "Please answer the question" : ""
                                            }
                                        </FormControl>
                                    </Box>
                                }

                                <Box className="eachQuestion">
                                    <FormControl>
                                        <FormLabel >Question Two</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="question-one-label"
                                            name="answer4"
                                            onChange={(e) => { setAnswer({ ...answer, [e.target.name]: e.target.value }); answer.answer4 !== null ? setRadioErr(true) : setRadioErr(false); }}
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                        {
                                            radioErr === true ? "Please answer the question" : ""
                                        }
                                    </FormControl>
                                </Box>
                                <Box className="eachQuestion">
                                    <FormControl>
                                        <FormLabel >Question Three</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="question-one-label"
                                            name="answer4"
                                            onChange={handleAnswerChange}
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                        {
                                            radioErr === true ? "Please answer the question" : ""
                                        }
                                    </FormControl>
                                </Box>


                            </Box>
                            :
                            <Box className="stepTwo stepBox">
                                <Box className="user_form">
                                    <Grid container spacing={4}>



                                        <Grid item xs={12} sm={6}>
                                            <Typography variant='h3'>Client Information</Typography>
                                            <Box className="form_group">
                                                <TextField
                                                    label="Full Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    InputLabelProps={{ style: { fontSize: 16 } }}
                                                    onChange={(e) => { setFullName(e.target.value); setErrors({ ...errors, fullName: "" }); }}
                                                    error={!!errors.fullName}
                                                    helperText={errors.fullName}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant='h3' display={{ xs: 'none', sm: "block" }}>&nbsp;</Typography>
                                            <Box className="form_group date_picker">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={['DatePicker']}>
                                                        <DatePicker
                                                            label="Date of Birth"
                                                            value={dateOfBirth}
                                                            onChange={(newValue) => { setDateOfBirth(newValue); setErrors({ ...errors, dateOfBirth: "" }); }}
                                                            slotProps={{
                                                                textField: {
                                                                    sx: {
                                                                        width: '100%',
                                                                        '& .MuiOutlinedInput-root': {
                                                                            '& fieldset': {
                                                                                borderColor: errors.dateOfBirth ? 'red' : 'default'
                                                                            },
                                                                            '&:hover fieldset': {
                                                                                borderColor: errors.dateOfBirth ? 'red' : 'default'
                                                                            },
                                                                            '&.Mui-focused fieldset': {
                                                                                borderColor: errors.dateOfBirth ? 'red' : 'default'
                                                                            }
                                                                        }
                                                                    },
                                                                    error: !!errors.dateOfBirth,
                                                                    helperText: errors.dateOfBirth
                                                                }
                                                            }}
                                                        // renderInput={(params) => (
                                                        //     <TextField {...params} error={!!errors.dateOfBirth} helperText={errors.dateOfBirth} />
                                                        // )}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="form_group">
                                                <TextField
                                                    label="Phone"
                                                    variant="outlined"
                                                    fullWidth
                                                    InputLabelProps={{ style: { fontSize: 16 } }}
                                                    onChange={(e) => { setPhone(e.target.value); setErrors({ ...errors, phone: "" }); }}
                                                    error={!!errors.phone}
                                                    helperText={errors.phone}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="form_group">
                                                <TextField
                                                    label="Email"
                                                    variant="outlined"
                                                    fullWidth
                                                    InputLabelProps={{ style: { fontSize: 16 } }}
                                                    onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: "" }); }}
                                                    error={!!errors.email}
                                                    helperText={errors.email}
                                                />
                                            </Box>
                                        </Grid>

                                    </Grid>
                                </Box>
                            </Box>
                        }
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
                            <Button
                                variant="contained"
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1, display: activeStep === 0 ? 'none' : 'block' }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {activeStep === steps.length - 1 ?
                                <Button variant="contained" onClick={handleSubmit}>
                                    Submit
                                </Button>
                                :
                                <Button variant="contained" onClick={handleNext}>
                                    Next
                                </Button>
                            }
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </StepperWrapper>
    )
}

export default StepperPage