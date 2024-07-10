'use client'
import { GithubSearchInterface, GIthubSearchItemInterface } from '@/interfaces/github-user.interface';
import { SITE_DOMAIN } from '@/utills/config/config';
import {SearchModal, StyledAlert,MacContainerHeader, TreeList, SearchBar, Screen, Spinner} from 'juny-react-style';
import { useState} from "react";
import styled from 'styled-components';
import {useRouter} from "next/navigation";
import { KeyIcon } from 'react-symbol';

const SearchModalWrap = styled.div`
    display:flex;
    flex-direction: column;
    // gap: 1rem;
    margin 0 auto;
    width: 100vh;
    height: 100vh;
    // max-width: 70%;
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
                            title={<KeyIcon
                                viewBox='0 0 12 12'
                                width='12'
                                height='20'
                            >ESC</KeyIcon>}
                            showHidden={false}
                            showMinimize={false}
                            onClose={() => setIsShow(!isShow)}
                    />
                    <SearchModalWrap>
                        <SearchBar 
                            $cursor='pointer'
                            onSearch={handleOnSearch}
                            $onKeyUp={(e,query) => {
                                console.log(e.code);
                                if(e.code === 'Enter'){
                                    handleOnSearch(query);
                                }
                                if(e.code === 'Escape'){
                                    setIsShow(false);
                                }
                            }}
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
                                    setIsShow(false);
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