import { BetweenContainer} from "juny-react-style";
import DarkModeButton from "@/components/ui/DarkModeButton";
import {useGithubUser} from "@/components/providers/git.user.data.provider";
import {Profile, Spinner} from "juny-react-style";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
const ProfileWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`
function Header(){
    const {userData} = useGithubUser();
    const path = usePathname();
    
    return (
        <BetweenContainer>
            <ProfileWrap>
                {userData
                ? <>
                    <Link 
                        href={"/"} > 
                        <Profile 
                            src={userData.avatar_url}
                        />
                    </Link>
                    {userData.login}
                    </>
                : <Spinner />}
            </ProfileWrap>
            <DarkModeButton />
        </BetweenContainer>
    )
}
export default Header;