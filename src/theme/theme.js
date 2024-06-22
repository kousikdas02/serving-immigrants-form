
import { createTheme } from "@mui/material";

const themeOptions = [
    {
        name: "light",
        option: {
            typography: {
                fontFamily: ["Helvetica", "sans-serif"].join(","),
                fontSize: 16,
                h1: {
                    fontFamily: ["Helvetica", "sans-serif"].join(","),
                    fontSize: 40,
                    lineHeight: 1,
                    margin: "0 0 40px 0",
                    fontWeight: 800,
                    color: "#00194C",
                },
                h2: {
                    fontFamily: ["Helvetica", "sans-serif"].join(","),
                    fontWeight: 800,
                    color: "#00194C",
                    fontSize: 30,
                    lineHeight: 1,
                    margin: "0 0 10px 0",
                },
                h3: {
                    fontFamily: ["Helvetica", "sans-serif"].join(","),
                    fontWeight: 800,
                    color: "#00194C",
                    fontSize: 22,
                    lineHeight: 1,
                    margin: "0 0 5px 0",
                },
                h4: {
                    fontFamily: ["Helvetica", "sans-serif"].join(","),
                    fontWeight: 800,
                    color: "#00194C",
                },
                h5: {
                    fontFamily: ["Helvetica", "sans-serif"].join(","),
                    fontWeight: 800,
                    color: "#00194C",
                },
                h6: {
                    fontFamily: ["Helvetica", "sans-serif"].join(","),
                    fontWeight: 800,
                    color: "#00194C",
                },
                
            },
            palette: {
                mode: "light",
                primary: {
                    main: "#0055FF",
                    // light: "#FFD3E0",
                },
            },
        },
    },
    {
        name: "dark",
        option: {
            palette: {
                mode: "dark",
            },
        },
    },
];

export const createMuiTheme = (themeMode) => {
    let options = themeOptions.find((item) => item.name === themeMode);

    if (!options) {
        console.warn("theme not found!");
        [options] = themeOptions;
    }
    

    return createTheme(options.option);
    
};