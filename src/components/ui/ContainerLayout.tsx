'use client'
import {ReactNode} from "react";
import { MacContainer, MacContainerProps, useTheme} from "juny-react-style";
import styled from "styled-components";
import {useRouter} from "next/navigation";


const ContainerLayoutWrapStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
      justify-content: center;
      align-items: center;
`
export const ContainerLayoutStyled = styled.div`
  height: calc(100% - 0.5rem);
  width: calc(100% - 3rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export interface ContainerLayoutProps extends MacContainerProps{
    onClose?: () => void
    theme?: any
    title?: string | ReactNode
}
function ContainerLayout({children, onClose, ...props}: ContainerLayoutProps){
    const router = useRouter();
    const {theme} = useTheme();
    
    return (
        <ContainerLayoutWrapStyled>
        <ContainerLayoutStyled>
            <MacContainer
                {...props}
                overflow="hidden"
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