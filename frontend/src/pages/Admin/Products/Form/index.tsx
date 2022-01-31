import { Box, Button, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select, { StylesConfig } from 'react-select';

import { Textarea } from 'components/Form/Textarea';
import { Product } from 'types/product';
import { Input } from 'components/Form/Input';

import requestData from 'api/requests';
import { Category } from 'types/category';

const formSchema = yup.object().shape({
    name: yup.string().required('Nome é um campo obrigatório!'),
    price: yup.string().required('Valor é um campo obrigatório!'),
    description: yup.string().required('Descrição é um campo obrigatório!'),
    categories: yup
        .array()
        .required('Categoria é um campo obrigatório!')
        .min(1),
});

type CategoryProps = {
    content: Category[];
};

const styleSelect: StylesConfig<Category> = {
    control: (styles) => ({
        ...styles,
        backgroundColor: '#181b23',
        border: 0,
        color: '#363636',
        ':focus-within': {
            background: '#1F2029',
            border: '1px solid #4299e1',
        },
    }),
    option: (styles) => ({
        ...styles,
        backgroundColor: '#181b23',
        ':hover': { background: '#22252e', cursor: 'pointer' },
    }),
    placeholder: (styles) => ({ ...styles, color: '#797D9A' }),
    menuList: (styles) => ({ ...styles, background: '#181b23' }),
};

export const Form = () => {
    const toast = useToast();
    const { productId } = useParams();
    const navigate = useNavigate();
    const isEditing = productId !== 'new';

    const [selectCategories, setSelectCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSelect, setIsLoadingSelect] = useState(false);
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<Product>({
        resolver: yupResolver(formSchema),
    });

    const onSubmit: SubmitHandler<Product> = async ({
        name,
        description,
        price,
        categories,
        imgUrl,
    }) => {
        try {
            const text = isEditing ? 'editado' : 'cadastrado';

            setIsLoading(true);
            const data = {
                name,
                description,
                price: Number(price),
                categories,
                date: new Date(),
                imgUrl: isEditing ? imgUrl : '',
            };
            await requestData<Product>({
                method: isEditing ? 'PUT' : 'POST',
                url: isEditing ? `/products/${productId}` : '/products',
                data,
                withCredentials: true,
            });

            toast({
                title: `Produto ${text}.`,
                description: `O produto ${name} foi ${text} com sucesso`,
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'bottom-left',
            });

            navigate(-1);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const getCategories = useCallback(async () => {
        try {
            setIsLoadingSelect(true);
            const data = await requestData<CategoryProps>({
                url: `/categories`,
            });

            if (data) {
                setSelectCategories(data.content);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoadingSelect(false);
        }
    }, []);

    const getProduct = useCallback(async () => {
        try {
            setIsLoadingProduct(true);
            const data = await requestData<Product>({
                url: `/products/${productId}`,
            });

            if (data) {
                const { name, price, description, imgUrl, categories } = data;

                setValue('name', name);
                setValue('price', price);
                setValue('description', description);
                setValue('imgUrl', imgUrl);
                setValue('categories', categories);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoadingProduct(false);
        }
    }, [productId, setValue]);

    useEffect(() => {
        if (isEditing) {
            getProduct();
        }

        getCategories();
    }, [isEditing, getProduct, getCategories]);

    return (
        <>
            {isLoadingProduct ? (
                <Flex w="100%" mt="20" align="center" justify="center">
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </Flex>
            ) : (
                <>
                    <Box bg="gray.800" p="8" borderRadius="4">
                        <Text color="gray.500" fontSize="20px">
                            Dados do Produto
                        </Text>

                        <Flex
                            flexDir={['column']}
                            as="form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Flex
                                mt="5"
                                gap="5"
                                flexDir={['column', 'column', 'row']}
                            >
                                <Flex
                                    flexDir={['column']}
                                    gap="4"
                                    w={['100%', '100%', '50%']}
                                >
                                    <Input
                                        placeholder="Nome do produto"
                                        {...register('name')}
                                        name="name"
                                        error={errors.name}
                                    />
                                    <Input
                                        placeholder="Preço do produto"
                                        {...register('price')}
                                        name="price"
                                        error={errors.price}
                                    />

                                    <Controller
                                        {...register('categories')}
                                        name="categories"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isMulti
                                                name="categories"
                                                placeholder="Categorias"
                                                options={selectCategories}
                                                isLoading={isLoadingSelect}
                                                getOptionValue={(category) =>
                                                    String(category.id)
                                                }
                                                getOptionLabel={(category) =>
                                                    category.name
                                                }
                                                styles={styleSelect}
                                            />
                                        )}
                                    />
                                    {errors.categories && (
                                        <Text
                                            fontSize="12px"
                                            color="red.400"
                                            marginTop="-10px"
                                        >
                                            Campo obrigatório escolha pelomenos
                                            uma categoria
                                        </Text>
                                    )}

                                    <Flex
                                        align={['flex-start', 'center']}
                                        flexDir={['column', 'row']}
                                        gap={['3', '0']}
                                    >
                                        <Button
                                            colorScheme="green"
                                            size="sm"
                                            w="150px"
                                        >
                                            Adicionar Imagem
                                        </Button>
                                        <Text
                                            ml={['0', '5']}
                                            fontSize="12px"
                                            w={['100%', '200px']}
                                            color="gray.500"
                                        >
                                            As imagens devem ser JPG ou PNG e
                                            não devem ultrapassar 5 mb.
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Box w={['100%', '100%', '50%']}>
                                    <Textarea
                                        placeholder="Descrição"
                                        borderColor="gray.400"
                                        h="152px"
                                        {...register('description')}
                                        name="description"
                                        error={errors.description}
                                        resize="none"
                                    />
                                </Box>
                            </Flex>

                            <Flex
                                gap="5"
                                w="100%"
                                mt="8"
                                justify={['flex-end']}
                            >
                                <Button
                                    w={['50%', '150px']}
                                    size="sm"
                                    colorScheme="red.200"
                                    variant="outline"
                                    onClick={() => navigate(-1)}
                                    _hover={{
                                        color: 'red.300',
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    w={['50%', '150px']}
                                    size="sm"
                                    colorScheme="facebook"
                                    type="submit"
                                    isLoading={isLoading}
                                >
                                    {isEditing ? 'Editar' : 'Salvar'}
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                </>
            )}
        </>
    );
};
