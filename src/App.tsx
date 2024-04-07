import { ChakraProvider } from '@chakra-ui/react';
import { AppRouter } from './AppRouter';
import { theme } from './chakra-theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
