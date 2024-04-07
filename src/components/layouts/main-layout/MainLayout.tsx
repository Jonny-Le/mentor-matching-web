import { Container, Stack } from '@chakra-ui/react';
import { Header } from '@src/components/common';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Stack spacing={4}>
      <Header />
      <Container maxW="container.lg">{children}</Container>
    </Stack>
  );
};
