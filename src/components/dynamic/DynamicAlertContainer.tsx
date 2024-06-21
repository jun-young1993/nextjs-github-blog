"use client"
import { AlertProps } from "juny-react-style";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import('./items/DynamicAlertContainer'), {
	ssr: true,
});

export default function DynamicALertContainerComponent(props:AlertProps){
	return <DynamicComponent {...props} />
}

