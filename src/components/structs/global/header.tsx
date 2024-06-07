'use client';
import {DarkAndLightModeButton, BetweenContainer} from "juny-react-style";
import { GithubProfile } from "react-github-issue";

interface HeaderProps {
    initMode: boolean
    onClick: (mode: string) => void
}
function Header({initMode, onClick}: HeaderProps){
    fetch('/api/github/user')
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
    })
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