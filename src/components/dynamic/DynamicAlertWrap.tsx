"use client";
import { AlertWrapProps } from "juny-react-style";
import dynamic from "next/dynamic";


const DynamicComponent = dynamic(() => import('./items/DynamicAlertWrap'), {
	ssr: true,
});

export default function DynamicAlertWrapComponent({ children, ...props }: AlertWrapProps) {

	return <DynamicComponent {...props} >{children}</DynamicComponent>;
}
