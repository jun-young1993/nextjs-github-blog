import {DarkAndLightModeButton, useTheme} from "juny-react-style";

export default function DarkModeButton(){
    const {theme, setTheme} = useTheme()
    return (
        <DarkAndLightModeButton
            initMode={theme === 'light' ? true : false}
            onClick={(mode) => {
                if(mode === 'light' || mode === 'dark'){
                    setTheme(mode);
                }
            }}
            iconSize={"24"}
        />
    )
}