"use client";
import { AlertProps } from "juny-react-style";
import dynamic from "next/dynamic";
import { Children, ReactNode, useState } from "react";

const DynamicComponent = dynamic(() => import('./items/DynamicAlert'), {
	ssr: true,
});

export default function DynamicAlertComponent({ children, ...props }: AlertProps) {

	return <DynamicComponent {...props} >{children}</DynamicComponent>;
}
