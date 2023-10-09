import { Box, Typography } from "@mui/material";
import {styled} from '@mui/system';
const LogoTitle = styled(Typography)(
    {
       
        fontFamily: "'Happy Monkey', cursive",
        fontWeight:"bold",
        fontSize:"clamp(1rem, 2rem, 2.25rem)",
        boxSizing:"border-box"
        
    }
);
export default LogoTitle;