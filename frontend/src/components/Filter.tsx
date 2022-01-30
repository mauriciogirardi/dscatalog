import { Button, Flex } from '@chakra-ui/react';
import { AiOutlineClear } from 'react-icons/ai';
import { RiSearch2Line } from 'react-icons/ri';
import { InputSearch } from './Form/InputSearch';
import { Select } from './Form/Select';

export const Filter = () => {
    return (
        <Flex
            bg={['gray.800']}
            h={['65px']}
            px="5"
            py={['20', '20', '0']}
            borderRadius="4"
            gap={['5']}
            align={['center']}
            flexDirection={['column', 'column', 'row']}
            justify={['center']}
            w="100%"
            boxShadow="2px 4px 8px 1px rgba(0,0,0,0.2)"
        >
            <Flex
                justify={['space-between']}
                flexDirection={['column', 'column', 'row']}
                gap={['3']}
                w="100%"
            >
                <Flex w={['100%', '100%', '50%']} align={['center']}>
                    <InputSearch
                        name="search"
                        placeholder="Nome do produto"
                        icon={RiSearch2Line}
                    />
                </Flex>

                <Flex w={['100%', '100%', '50%']}>
                    <Select
                        data={[]}
                        placeholder="Categoria"
                        name="categories"
                    />

                    <Button
                        title="Limpar filtro"
                        leftIcon={<AiOutlineClear size={25} />}
                        colorScheme="blue"
                        _focus={{}}
                        _active={{}}
                        _hover={{ bg: 'gray.800', color: 'blue.500' }}
                        variant="ghost"
                        pr={0}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};
