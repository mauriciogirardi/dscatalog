import { forwardRef, ForwardRefRenderFunction, ElementType } from 'react';
import {
    Input,
    InputProps,
    FormControl,
    InputGroup,
    Icon,
    InputRightElement,
} from '@chakra-ui/react';

interface InputSearchProps extends InputProps {
    icon?: ElementType;
}

const InputSearchBase: ForwardRefRenderFunction<
    HTMLInputElement,
    InputSearchProps
> = ({ icon, ...rest }, ref) => {
    return (
        <FormControl>
            <InputGroup>
                <Input
                    type="search"
                    autoComplete="off"
                    name="search"
                    id="search"
                    bgColor="gray.800"
                    variant="flushed"
                    size="md"
                    borderColor="gray.600"
                    _hover={{}}
                    _placeholder={{ color: 'gray.600' }}
                    ref={ref}
                    {...rest}
                />

                {!!icon && (
                    <InputRightElement>
                        <Icon as={icon} fontSize="20" color="gray.600" />
                    </InputRightElement>
                )}
            </InputGroup>
        </FormControl>
    );
};

export const InputSearch = forwardRef(InputSearchBase);
