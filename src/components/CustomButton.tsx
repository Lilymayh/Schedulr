import React from 'react';
import { Button, ButtonProps } from 'react-native';

interface CustomButtonProps extends ButtonProps {
  title: string;
	onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	...props
}) => (
	<Button 
	title={title} 
	onPress={onPress}
	{...props} />
)

export default CustomButton;