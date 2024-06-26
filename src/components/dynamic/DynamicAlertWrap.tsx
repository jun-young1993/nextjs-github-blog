"use client";

import dynamic from "next/dynamic";


const DynamicAlertWrapComponent = dynamic(() => import('./items/DynamicAlertWrap'), {
	ssr: true,
});

export default DynamicAlertWrapComponent;
