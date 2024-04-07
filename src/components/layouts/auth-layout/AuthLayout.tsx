import { Box, Hide, Image } from '@chakra-ui/react';
import authBg from '@src/assets/img/saigon.png';
import './auth-layout.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="auth-layout">
      <Hide below="md">
        <Image src={authBg} className="auth-layout__img-bg" />
      </Hide>
      <Box
        className="auth-layout__content"
        p={{ base: 5, md: 10 }}
        left={{ md: '40%' }}
        w={{ base: '100%', md: '60%' }}
      >
        {children}
      </Box>
    </div>
  );
};
