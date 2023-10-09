import { Typography ,useTheme} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
const AdvertizeWidget = () =>{

const {palette} = useTheme()
const dark = palette.neutral.dark;
const medium = palette.neutral.medium;
const main = palette.neutral.main;
return(
    <WidgetWrapper
    >
        <FlexBetween>
            <Typography color={dark} variant="h5" fontWeight={"500"}>
                Sponsored
            </Typography>
            <Typography color={medium}>

                Create Ad
            </Typography>
        </FlexBetween>
        <img width={"100%"} height={"auto"}  src="http://localhost:3001/assets/foundation-containers-advertising-assortment.jpg" alt="ad" style={{
            borderRadius:"0.75rem",margin:"0.75rem 0"
        }} />
        <FlexBetween>
            <Typography color={main}>
                MikaCosmetic's
            </Typography>
            <Typography color={medium}>
                MikaCosmetics.com
            </Typography>
        </FlexBetween>
        <Typography color={medium} margin={"0.5rem 0"}>
Your pathway to stunning and immaculate beuty and make sure your skin is exfoliating skin and shining light light.
        </Typography>
    </WidgetWrapper>
)

}
export default AdvertizeWidget;