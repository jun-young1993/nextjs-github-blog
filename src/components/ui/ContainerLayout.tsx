'use client'
import {ReactNode} from "react";
import {LightTheme, MacContainer} from "juny-react-style";
import styled from "styled-components";
import {useRouter} from "next/navigation";

const ContainerLayoutWrapStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
      justify-content: center;
      align-items: center;
`
const ContainerLayoutStyled = styled.div`
  height: calc(100% - 0.5rem);
  width: calc(100% - 3rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;
interface ContainerLayoutProps {
    onClose?: () => void
    children?: ReactNode
    theme?: "light" | "dark"
}
function ContainerLayout({children, onClose, theme}: ContainerLayoutProps){
    const router = useRouter();
    return (
        <ContainerLayoutWrapStyled>
        <ContainerLayoutStyled>
            <MacContainer
                theme={LightTheme}
                onClose={() => {
                    router.push('/')
                    console.log("=>(ContainerLayout.tsx:25) router", router);
                }}
            >
                {children}
            </MacContainer>
        </ContainerLayoutStyled>
        </ContainerLayoutWrapStyled>
    )
}
export default ContainerLayout;