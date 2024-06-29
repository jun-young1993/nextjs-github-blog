"use client";
import { AlertProps } from "juny-react-style";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import('./items/DynamicAlert'), {
	ssr: true,
});

export default function DynamicAlertComponent({ children, ...props }: AlertProps) {

	return <DynamicComponent {...props} >{children}</DynamicComponent>;
}
