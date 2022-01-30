import { Box, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

import './form.styles.css';

interface SelectProps {
    data: [];
    placeholder?: string;
    flushed?: boolean;
    name: string;
    error?: FieldError;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
    { data, name, placeholder, flushed = true, error = null },
    ref
) => {
    return (
        <FormControl isInvalid={!!error}>
            <select
                ref={ref}
                name={name}
                id={name}
                className={flushed ? 'select_flushed' : 'select_solid'}
            >
                <option value="" className="placeholder">
                    {placeholder}
                </option>
                <option value="mauricio">Mauricio</option>
                <option value="josiana">Josiana</option>
                <option value="jose">Jose</option>
            </select>

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

export const Select = forwardRef(SelectBase);
