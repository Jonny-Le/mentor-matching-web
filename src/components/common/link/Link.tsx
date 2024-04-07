import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

interface CustomLinkProps extends ChakraLinkProps {
  to: ReactRouterLinkProps['to'];
}

export const Link = ({ children, to, ...props }: CustomLinkProps) => {
  const defaultProps = {
    color: 'blue.500',
  };

  const linkProps = {
    ...defaultProps,
    ...props,
  };

  return (
    <ChakraLink as={ReactRouterLink} to={to} {...linkProps}>
      {children}
    </ChakraLink>
  );
};
