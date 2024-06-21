"use client"
import { AlertProps } from "juny-react-style";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import('./items/DynamicAlert'), {
	ssr: true,
});

export default function DynamicALertComponent(props:AlertProps){
	return <DynamicComponent {...props} />
}

