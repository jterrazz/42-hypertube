import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';
import {withFormik} from "formik";
import * as Yup from "yup";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://intra.42.fr/">
                HyperTube
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    divider: {
        margin: '20px',
    },
    button: {
        margin: theme.spacing(1),
    },
    boxbutton: {
        marginTop: '20px',
    },
}));

const signUpSide = props => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container justify="center" className={classes.boxbutton}>
                            <Grid item xs>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<FacebookIcon />}
                                >
                                    Facebook
                                </Button>
                            </Grid>
                            <Grid item xs>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<TwitterIcon />}
                                >
                                    Twitter
                                </Button>
                            </Grid>

                            <Grid item xs>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<LinkedInIcon />}
                                >
                                    LinkedIn
                                </Button>
                            </Grid>

                            <Grid item xs>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<AccountBoxIcon />}
                                >
                                    Google
                                </Button>
                            </Grid>

                            <Grid item xs>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<PersonalVideoIcon />}
                                >
                                    Intra 42
                                </Button>
                            </Grid>
                        </Grid>
                        <Divider variant="middle" className={classes.divider} />
                        <TextField
                            autoComplete="fname"
                            margin="normal"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.firstName ? errors.firstName : ""}
                            error={touched.firstName && Boolean(errors.firstName)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.lastName ? errors.lastName : ""}
                            error={touched.lastName && Boolean(errors.lastName)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.email ? errors.email : ""}
                            error={touched.email && Boolean(errors.email)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.password ? errors.password : ""}
                            error={touched.password && Boolean(errors.password)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            id="confirmPassword"
                            autoComplete="confirm-password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isSubmitting}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgot" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    {"Already have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

const SignUpSide = withFormik({
    mapPropsToValues: ({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    }) => {
        return {
            firstName: firstName || "",
            lastName: lastName || "",
            email: email || "",
            password: password || "",
            confirmPassword: confirmPassword || ""
        };
    },

    validationSchema: Yup.object().shape({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must contain at least 8 characters")
            .required("Enter your password"),
        confirmPassword: Yup.string()
            .required("Confirm your password")
            .oneOf([Yup.ref("password")], "Password does not match")
    }),

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            // submit to the server
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    }
})(signUpSide);

export default SignUpSide;