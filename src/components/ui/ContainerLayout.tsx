'use client'
import {ReactNode} from "react";
import { MacContainer, useTheme} from "juny-react-style";
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
    theme?: any
}
function ContainerLayout({children, onClose}: ContainerLayoutProps){
    const router = useRouter();
    const {theme} = useTheme();
    return (
        <ContainerLayoutWrapStyled>
        <ContainerLayoutStyled>
            <MacContainer
                overflow="auto"
                onClose={() => {
                    router.push('/')
                }}
            >
                <article
                    className={`markdown-body ${theme}-mode`}
                >
                    {children}
                </article>
            </MacContainer>
        </ContainerLayoutStyled>
        </ContainerLayoutWrapStyled>
    )
}
export default ContainerLayout;