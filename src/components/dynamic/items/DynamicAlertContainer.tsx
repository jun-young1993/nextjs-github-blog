import { AlertContainer } from "juny-react-style"
import { ReactNode } from "react";

const DynamicAlertContainer = ({children}:{children: ReactNode}) => {
	return <AlertContainer>{children}</AlertContainer>
}

export default DynamicAlertContainer;