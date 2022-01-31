import {
    Button,
    Flex,
    Image,
    Tag,
    Text,
    Tooltip,
    useToast,
} from '@chakra-ui/react';
import requestData from 'api/requests';

import { Price } from 'components/Price';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from 'types/product';
import { textDots } from 'utils/formatters';

type CardRowProductProps = {
    product: Product;
    onDelete: () => void;
};

export const CardRowProduct = ({ product, onDelete }: CardRowProductProps) => {
    const navigate = useNavigate();
    const toast = useToast();

    const [isDelete, setIsDelete] = useState(false);

    const handleEdit = (id: number) => {
        navigate(`${id}`);
    };

    const handleDeleteProduct = async (id: number, name: string) => {
        try {
            setIsDelete(true);
            await requestData<Product>({
                method: 'DELETE',
                url: `/products/${id}`,
                withCredentials: true,
            });

            onDelete();

            toast({
                title: `Deletar.`,
                description: `O produto ${name} foi deletado com sucesso`,
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'bottom-left',
            });
        } catch (e) {
            console.error(e);
        } finally {
            setIsDelete(false);
        }
    };

    return (
        <Flex
            borderRadius="4px"
            boxShadow="md"
            bg={['white']}
            w="100%"
            py="4"
            px={['8', '8', '4']}
            flexDir={['column', 'column', 'row']}
        >
            <Flex
                borderRight={['0', '0', '1px solid #ccc']}
                borderBottom={['1px solid #ccc', '1px solid #ccc', '0']}
                justify={['center']}
            >
                {!!product.imgUrl ? (
                    <Image
                        mr={['0', '0', '5']}
                        mb={['5', '5', '0']}
                        src={product.imgUrl}
                        alt={product.name}
                        objectFit="cover"
                        w="100px"
                    />
                ) : (
                    <Image
                        mr={['0', '0', '5']}
                        mb={['5', '5', '0']}
                        src="gibbresh.png"
                        fallbackSrc="https://via.placeholder.com/100"
                    />
                )}
            </Flex>

            <Flex
                ml={['0', '0', '5']}
                flexDir="column"
                align="flex-start"
                justify="center"
                mt={['5', '5', '0']}
            >
                <Text fontSize="20px" fontWeight={700} color="gray.800" mb="-2">
                    {product.name}
                </Text>

                <Price amount={product.price} />

                <Tooltip
                    hasArrow
                    label={
                        product?.description.length > 80
                            ? product.description
                            : null
                    }
                    bg="gray.800"
                    color="gray.400"
                    placement="top-end"
                >
                    <Text
                        fontSize="12px"
                        color="gray.400"
                        w={['100%', '100%', '500px']}
                        overflow="hidden"
                    >
                        {textDots(product?.description, 80)}
                    </Text>
                </Tooltip>

                <Flex gap="2" align="center">
                    {product.categories.map((category) => (
                        <Tag
                            key={category.id}
                            mt="3"
                            borderRadius="full"
                            variant="solid"
                            colorScheme="gray"
                            size="sm"
                        >
                            {category.name}
                        </Tag>
                    ))}
                </Flex>
            </Flex>

            <Flex
                flexDir={['row', 'row', 'column']}
                align="flex-end"
                justify="center"
                flex="1"
                gap="4"
                mt={['5', '5', '0']}
            >
                <Button
                    variant="outline"
                    colorScheme="blackAlpha"
                    w={['50%', '50%', '120px']}
                    h="34px"
                    onClick={() => handleEdit(product.id)}
                    disabled={isDelete}
                >
                    Editar
                </Button>
                <Button
                    variant="outline"
                    colorScheme="red"
                    w={['50%', '50%', '120px']}
                    h="34px"
                    isLoading={isDelete}
                    onClick={() =>
                        handleDeleteProduct(product.id, product.name)
                    }
                >
                    Excluir
                </Button>
            </Flex>
        </Flex>
    );
};
