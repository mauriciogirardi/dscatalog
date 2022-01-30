import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Text, Textarea } from '@chakra-ui/react';

import { Select } from 'components/Form/Select';
import { Input } from 'components/Form/Input';

export const Form = () => {
    const navigate = useNavigate();

    return (
        <Box bg="gray.800" p="8" borderRadius="4">
            <Text color="gray.500" fontSize="20px">
                Dados do Produto
            </Text>

            <Flex mt="5" gap="5" flexDir={['column', 'column', 'row']}>
                <Flex flexDir={['column']} gap="4" w={['100%', '100%', '50%']}>
                    <Input name="name" placeholder="Nome do produto" />
                    <Input name="price" placeholder="Preço do produto" />
                    <Select
                        data={[]}
                        placeholder="Categorias"
                        flushed={false}
                    />

                    <Flex
                        align={['flex-start', 'center']}
                        flexDir={['column', 'row']}
                        gap={['3', '0']}
                    >
                        <Button colorScheme="green" size="sm" w="150px">
                            Adicionar Imagem
                        </Button>
                        <Text
                            ml={['0', '5']}
                            fontSize="12px"
                            w={['100%', '200px']}
                            color="gray.500"
                        >
                            As imagens devem ser JPG ou PNG e não devem
                            ultrapassar 5 mb.
                        </Text>
                    </Flex>
                </Flex>

                <Box w={['100%', '100%', '50%']}>
                    <Textarea
                        placeholder="Descrição"
                        borderColor="gray.400"
                        h="152px"
                    />
                </Box>
            </Flex>

            <Flex gap="5" w="100%" mt="8" justify={['flex-end']}>
                <Button
                    w={['50%', '150px']}
                    size="sm"
                    colorScheme="red.200"
                    variant="outline"
                    onClick={() => navigate(-1)}
                >
                    Cancelar
                </Button>
                <Button w={['50%', '150px']} size="sm" colorScheme="facebook">
                    Salvar
                </Button>
            </Flex>
        </Box>
    );
};
