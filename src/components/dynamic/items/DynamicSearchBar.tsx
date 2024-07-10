'use client'
import { GithubSearchInterface, GIthubSearchItemInterface } from '@/interfaces/github-user.interface';
import { SITE_DOMAIN } from '@/utills/config/config';
import {SearchModal, StyledAlert,MacContainerHeader, TreeList, SearchBar, Screen, Spinner} from 'juny-react-style';
import {useState} from "react";
import styled from 'styled-components';
import {useRouter} from "next/navigation";

const SearchModalWrap = styled.div`
    display:flex;
    flex-direction: column;
    // gap: 1rem;
    margin 0 auto;
    width: 100vh;
    height: 100vh;
    max-width: 70%;
    max-height: 70%;
`
const DynamicSearchBar = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [items, setItems] = useState<GIthubSearchItemInterface[]|[]>([]);
    const [isLoading, setIsLoading]  = useState<boolean>(false);
    const router = useRouter();
    const handleClick = () => {
        setIsShow(!isShow)
    }
    const handleOnSearch = (query: string) => {
        
        if(query.length && (isLoading === false)){
            setIsLoading(true)    
            fetch(`${SITE_DOMAIN}/api/github/search/code?text=${query}`)
            .then((response) => response.json())
            .then((result: GithubSearchInterface) => {
                
                setItems(result.response.items);
                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false)
            })
        }
        
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
                    <MacContainerHeader
                            showHidden={false}
                            showMinimize={false}
                            onClose={() => setIsShow(!isShow)}
                    />
                    <SearchModalWrap>
                        <SearchBar 
                            onSearch={handleOnSearch}
                        />
                        <TreeList
                            title={isLoading && <Spinner />}
                            items={items.map((item) => {
                                return {
                                    userData: item,
                                    title: item.name
                                }
                            })}
                            onClick={(item) => {
                                if(item.userData){
                                    router.push(`/contents/${item.userData.path}`) 
                                }else{
                                    throw new Error('not found path');
                                }
                            }}
                        />
                    </SearchModalWrap>
                </StyledAlert>}
        </>

    )
}
export default DynamicSearchBar;