'use client'
import {ReactNode} from "react";
import {MacContainer} from "juny-react-style";
import styled from "styled-components";
const ContainerLayoutStyled = styled.div`
  height: calc(100% - 0.5rem);
  width: calc(100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;
function ContainerLayout({children}: {children: ReactNode}){
    return (
        <ContainerLayoutStyled>
            <MacContainer>
                {children}
            </MacContainer>
        </ContainerLayoutStyled>
    )
}
export default ContainerLayout;