import {
    Box,
    TextareaProps as TextareaChackraProps,
    FormControl,
    FormErrorMessage,
    Textarea as TextareaChackra,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

import './form.styles.css';

interface TextareaProps extends TextareaChackraProps {
    error?: FieldError;
}

const TextareaBase: ForwardRefRenderFunction<
    HTMLTextAreaElement,
    TextareaProps
> = ({ error = null, ...rest }, ref) => {
    return (
        <FormControl isInvalid={!!error} borderColor="gray.400" h="152px">
            <TextareaChackra {...rest} ref={ref} />

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

export const Textarea = forwardRef(TextareaBase);
