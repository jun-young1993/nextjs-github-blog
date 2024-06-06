'use client';
import {DarkAndLightModeButton, BetweenContainer} from "juny-react-style";

interface HeaderProps {
    initMode: boolean
    onClick: (mode: string) => void
}
function Header({initMode, onClick}: HeaderProps){
    return (
    <BetweenContainer>
             <div>my name</div>
             <DarkAndLightModeButton
                 initMode={initMode}
                 onClick={onClick}
                 iconSize={"24"}
             />
    </BetweenContainer>


    )
}
export default Header;