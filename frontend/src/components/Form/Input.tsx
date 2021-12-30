import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri';
import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction, ElementType } from 'react';
import {
  Input as InputChakra,
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
  Button,
  Icon,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useShowPassword } from 'hooks/useShowPassword';

interface InputProps extends ChakraInputProps {
  label?: string;
  icon?: ElementType;
  isTypePassword?: boolean;
  isFilled?: boolean;
  error?: FieldError;
  name: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    label,
    icon,
    error = null,
    isTypePassword = false,
    isFilled = false,
    ...rest
  },
  ref
) => {
  const { handleClick, showPassword } = useShowPassword();

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor="email">{label}</FormLabel>}

      <InputGroup>
        {!!icon && (
          <InputLeftElement>
            <Icon
              as={icon}
              fontSize="20"
              mt="2"
              color={isFilled ? 'blue.400' : 'gray.50'}
            />
          </InputLeftElement>
        )}

        <InputChakra
          autoComplete="off"
          name={name}
          id={name}
          focusBorderColor="blue.500"
          bgColor="gray.900"
          variant="filled"
          size="lg"
          _hover={{ bgColor: 'gray.900' }}
          ref={ref}
          {...rest}
        />

        {isTypePassword && (
          <InputRightElement mt="1">
            <Button
              size="sm"
              title="Mostrar Senha"
              focusBorderColor="blue.500"
              variant="unstyled"
              onClick={handleClick}
              _focus={{}}
            >
              {showPassword ? (
                <Icon
                  mt="2"
                  as={RiEyeFill}
                  fontSize="20"
                  color="blue.400"
                  _hover={{ color: 'blue.500' }}
                />
              ) : (
                <Icon
                  mt="2"
                  as={RiEyeCloseFill}
                  fontSize="20"
                  color="blue.400"
                  _hover={{ color: 'blue.500' }}
                />
              )}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>

      {!!error && (
        <Box mt="-1" mb="-2">
          <FormErrorMessage color="red.400" fontSize="12px">
            {error.message}
          </FormErrorMessage>
        </Box>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
