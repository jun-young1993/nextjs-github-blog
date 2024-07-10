'use client'


import {SearchModal, StyledAlert} from 'juny-react-style';
import {useState} from "react";
import {MacContainerHeader, TreeList} from "../../../../../react-style";
import ContainerLayout from "@/components/ui/ContainerLayout";


const DynamicSearchBar = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const handleClick = () => {
        setIsShow(!isShow)
        console.log("=>(DynamicSearchBar.tsx:9)",);
    }
    return (
        <>
            <SearchModal
                $onClick={handleClick}
            />
            {isShow
            && <StyledAlert
                    $opacity={"80%"}
                    position={"top-center"}
                    $animation={false}
                >
                    <>
                    <MacContainerHeader
                        onClose={() => setIsShow(!isShow)}
                    />
                    <TreeList
                        items={[
                            {
                                title: 'hi'
                            }
                        ]}
                    />
                    </>
                </StyledAlert>}
        </>

    )
}
export default DynamicSearchBar;