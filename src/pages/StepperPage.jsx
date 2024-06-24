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


    const [fullName, setFullName] = React.useState("");
    const [dateOfBirth, setDateOfBirth] = React.useState(null);
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [errors, setErrors] = React.useState({});
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
        newErrors = {};
        questions.forEach((question) => {
            handleValidation(null, question)
        });
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log(newErrors)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };


    const handleSubmit = () => {
        if (!validateFields()) {
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // axios({
        //     method: 'post',
        //     url: `https://api.hsforms.com/submissions/v3/integration/submit/${'46359715'}/${'e74cd6a7-deec-473b-9026-c1452d0f5c87'}`,
        //     data: JSON.stringify(data), // you are sending body instead
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        // })

        console.log(formData);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    // questions

    const questions = [
        {
            "name": "question_1",
            "options": [{ title: "Yes", value: true }, { title: "No", value: false }],
            SubQPresent: true,
            showSubQOn: { title: "Yes", value: true },
            subQ: [
                {
                    "name": "Sub question_11",
                    "options": [{ title: "Yes", value: true }, { title: "No", value: false }
                    ],
                    SubQPresent: true,
                    showSubQOn: { title: "Yes", value: true },
                    subQ: [
                        {
                            "name": "Sub Sub question_111",
                            "options": [{ title: "Yes", value: true }, { title: "No", value: false }
                            ],
                        },
                        {
                            "name": "Sub Sub question_112",
                            "options": [{ title: "Yes", value: true }, { title: "No", value: false }
                            ],
                        }
                    ]
                },
                {
                    "name": "Sub question_12",
                    "options": [{ title: "Yes", value: true }, { title: "No", value: false }
                    ],
                }
            ]
        },
        {
            "name": "question_2",
            "options": [{ title: "Yes", value: true }, { title: "No", value: false }
            ],
            SubQPresent: true,
            showSubQOn: { title: "Yes", value: true },
            subQ: [
                {
                    "name": "Sub question_21",
                    "options": [{ title: "Yes", value: true }, { title: "No", value: false }
                    ],
                },
                {
                    "name": "Sub question_22",
                    "options": [{ title: "Yes", value: true }, { title: "No", value: false }
                    ],
                }
            ]
        }
    ]
    const [formData, setFormData] = useState({});

    const handleAnswerChange = (questionName, answer) => {
        setFormData((prevData) => ({
            ...prevData,
            [questionName]: answer,
        }));
    };

    let newErrors = {};
    const handleValidation = (ParentQuestion, currentQuestion) => {
        if (ParentQuestion == null) {
            if (formData[currentQuestion.name] === null || formData[currentQuestion.name] === undefined) {
                newErrors[currentQuestion.name] = 'This field is required.';
            }
        } else {
            if (formData[ParentQuestion.name] === ParentQuestion.showSubQOn.value) {
                if (formData[currentQuestion.name] === null || formData[currentQuestion.name] === undefined) {
                    newErrors[currentQuestion.name] = 'This field is required.';
                }
            }
        }

        if (currentQuestion.SubQPresent) {
            currentQuestion.subQ.forEach((subQuestion) => {
                handleValidation(currentQuestion, subQuestion);
            });
        }
    }


    const renderSubQuestions = (subQArray) => {
        return subQArray.map((subQ) => (
            // <Box key={subQ.name}>
            //     <label>{subQ.name}</label>
            //     {subQ.options.map((option) => (
            //         <Box key={option.title}>
            //             <input
            //                 type="radio"
            //                 name={subQ.name}
            //                 value={option.value}
            //                 onChange={() => handleAnswerChange(subQ.name, option.value)}
            //             />
            //             {option.title}
            //         </Box>
            //     ))}
            //     {errors[subQ.name] && <span style={{ color: 'red' }}>{errors[subQ.name]}</span>}
            //     {formData[subQ.name] && subQ.subQ && renderSubQuestions(subQ.subQ)}
            // </Box>
            <Box className="eachQuestion">
                <FormControl>
                    <FormLabel >{subQ.name}</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="question-one-label"
                        name="answer1"
                    >
                         {subQ.options.map((option) => (
                            <FormControlLabel value={option.value} control={<Radio />} label={option.title}  onChange={() => handleAnswerChange(subQ.name, option.value)} />
                        ))}

                    </RadioGroup>
                </FormControl>
                {errors[subQ.name] && <Typography variant='body1' style={{ color: 'red' }}>{errors[subQ.name]}</Typography>}
                {formData[subQ.name] && subQ.subQ && renderSubQuestions(subQ.subQ)}
            </Box>
        ));
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

                                <Box>
                                    {questions.map((question) => (
                                        // <Box key={question.name}>
                                        //     <label>{question.name}</label>
                                        //     {question.options.map((option) => (
                                        //         <Box key={option.title}>
                                        //             <input
                                        //                 type="radio"
                                        //                 name={question.name}
                                        //                 value={option.value}
                                        //                 onChange={() => handleAnswerChange(question.name, option.value)}
                                        //             />
                                        //             {option.title}
                                        //         </Box>
                                        //     ))}
                                        //     {errors[question.name] && <span style={{ color: 'red' }}>{errors[question.name]}</span>}
                                        //     {formData[question.name] && question.subQ && renderSubQuestions(question.subQ)}
                                        // </Box>
                                        <Box className="eachQuestion" key={question.name}>
                                            <FormControl>
                                                <FormLabel >{question.name}</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="question-one-label"
                                                    name="answer1"
                                                >
                                                    {question.options.map((option) => (
                                                        <FormControlLabel value={option.value} control={<Radio />} label={option.title} onChange={() => handleAnswerChange(question.name, option.value)} />
                                                    ))}

                                                </RadioGroup>
                                            </FormControl>
                                            {errors[question.name] && <Typography variant='body1' style={{ color: 'red' }}>{errors[question.name]}</Typography>}
                                            {formData[question.name] && question.subQ && renderSubQuestions(question.subQ)}
                                        </Box>

                                    ))}
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