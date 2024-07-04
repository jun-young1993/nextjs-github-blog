import { AlertWrap, AlertWrapProps, AlertItem } from "juny-react-style"
import { useState } from "react";
import { LeftArrowIcon, RightArrowIcon } from "react-symbol";
import styled from "styled-components";
const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;  // 부모 요소의 높이
  cursor: pointer;
`
const DynamicAlertWrap = (props:AlertWrapProps) => {
	const [active, setState] = useState<boolean>(true);
	const handleClick = () => {
		setState(!active);
	}
	return (
		<>
			<AlertWrap 
				$backgroundColor={"rgba(0, 0, 0, 0.0)"}
				$opacity={active ? "100%" : "50%"}
				$topChildren={
					<AlertItem 
						level={"info"}
						$backgroundColor={"rgba(0, 0, 0, 0.0)"}
					>
						<ArrowButton
							onClick={handleClick}
						>
							{active 
							? <LeftArrowIcon width="35px" height="20px" viewBox="0 0 24 12" color="blue"/>
							: <RightArrowIcon width="35px" height="20px" viewBox="0 0 24 12" color="blue"/>
							}
							
						</ArrowButton>
					</AlertItem>
				}
				$columnGap="0px"
				$hiddenChildren={active}
				{...props} 
			/>
		</>
	)
}

export default DynamicAlertWrap;