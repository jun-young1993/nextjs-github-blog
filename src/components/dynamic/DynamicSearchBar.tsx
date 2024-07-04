'use client'
import dynamic from "next/dynamic";

const DynamicSearchBarComponent = dynamic(() => import("./items/DynamicSearchBar"),{
    ssr: true
});

export default DynamicSearchBarComponent;