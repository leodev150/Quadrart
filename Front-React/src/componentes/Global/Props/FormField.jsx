import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography, InputBase, List, ListItem, useMediaQuery } from "@mui/material"
import { HighlightOff, Check } from "@mui/icons-material"

const FormField = (props) => {
    const below760 = useMediaQuery("(max-width:760px)");
    const [width, setWidth] = useState(0);
    const ref = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const {
        label,
        type = "text",
        value,
        onChange,
        name,
        error,
        touched,
        handleBlur,
        column,
        wacky = false,
        fontFamily = "Typewriter",
        fontSize = "clamp(20px,1.8vw,25px)",
        underline = true,
        maxLength,
        textTransform,
    } = props;


    useEffect(() => {
        const ResizeFunction = () => {
            if (ref.current) {
                setWidth(ref.current.offsetWidth);
            }
        };

        ResizeFunction();
        window.addEventListener('resize', ResizeFunction);

        return () => {
            window.removeEventListener('resize', ResizeFunction);
        };
    }, [fontSize]);

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            columnGap="10px"
            flexDirection={column ? "column" : below760 ? "column" : "none"}
        >
            <Typography
                ref={ref}
                position={wacky ? "absolute" : ""}
                fontFamily={fontFamily}
                fontSize={fontSize}
                alignSelf={column || wacky ? "baseline" : below760 ? "baseline" : "center"}
            >
                {label}
            </Typography>
            <Box
                position="relative"
                width="100%"
                flex={1}
                display="flex"
                borderBottom={!underline ? "" : touched && error ? "1px solid red" : "1px solid black"}
                alignItems={wacky ? "baseline" : "center"}
                justifyContent="center"
            >
                <InputBase
                    multiline={wacky}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={(e) => { handleBlur(e); setIsFocused(false) }}
                    onFocus={() => setIsFocused(true)}
                    id={name}
                    inputProps={{
                        maxLength: maxLength
                    }}
                    sx={{
                        padding: 0,
                        width: "100%",
                        "& input": {
                            padding: 0,
                            width: "100%",
                            fontFamily: fontFamily,
                            fontSize: fontSize,
                            lineHeight: "1.5",
                            textTransform: textTransform,
                            appearance: "none"
                        },
                        "& textarea": {
                            padding: 0,
                            width: "100%",
                            fontFamily: fontFamily,
                            fontSize: fontSize,
                            lineHeight: "1.5",
                            textIndent: `${width + 3}px`,
                            textTransform: textTransform,
                            appearance: "none",
                        }
                    }}
                />
                {error && isFocused && touched
                    &&
                    <Box
                        display="flex"
                        flexDirection="column"
                        position="absolute"
                        maxWidth="400px"
                        top="180%"
                        padding="1vw"
                        backgroundColor="white"
                        zIndex="4"
                        borderRadius="1vw"
                        alignItems="center"
                        sx={{
                            animation: 'fadeIn 0.3s ease-in-out',
                            '@keyframes fadeIn': {
                                from: {
                                    opacity: 0,
                                },
                                to: {
                                    opacity: 1,
                                },
                            },
                        }}
                    >
                        <Box
                            position="absolute"
                            justifySelf="baseline"
                            display="flex"
                            width="20px"
                            height="50px"
                            top="-30px"
                            backgroundColor="white"
                            sx={{
                                clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
                            }}
                        />
                        <List sx={{ listStyleType: "disc", pl: 3, color: "red" }}>
                            {error.map((x, index) => (
                                <ListItem sx={{ display: 'list-item' }} key={index}>{x}</ListItem>
                            ))
                            }
                        </List>
                    </Box>
                }
                {
                    (error ?
                        <Box height="100%" display="flex" columnGap="10px" position="relative" alignSelf="center">
                            <HighlightOff sx={{ color: touched ? "red":"transparent", fontSize: fontSize }} />
                        </Box>
                        :
                        <Check sx={{ color: touched ? "green":"transparent", fontSize: fontSize }} />
                    )
                }
            </Box>
        </Box >
    )
}

export default FormField;