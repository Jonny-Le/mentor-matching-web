import { Flex, FormControl, FormLabel } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledFormControl = styled(FormControl)`
  width: 100%;
  @media screen and (min-width: 48em) {
    display: flex;
  }
`;

export const StyledFormLabel = styled(FormLabel)`
  flex: 1;
`;

export const StyledFormInputWrapper = styled(Flex)`
  flex: 3;
  flex-direction: column;
`;
