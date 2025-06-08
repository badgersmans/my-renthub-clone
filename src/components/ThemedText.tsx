import { Text, TextProps } from 'react-native'
import clsx from "clsx";

type ThemedTextProps = TextProps & {
  className?: string;
  children: React.ReactNode;
};

export default function ThemedText({className = '', children, ...rest}: ThemedTextProps) {
  const defaultStyles = "text-black dark:text-white";
  return (
    <Text className={clsx(defaultStyles, className)} {...rest}>
      {children}
    </Text>
  )
}