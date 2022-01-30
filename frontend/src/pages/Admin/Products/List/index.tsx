import { Box, Button, Flex } from '@chakra-ui/react';
import { Filter } from 'components/Filter';
import { CardRowProduct } from '../components/CardRowProduct';

const products = [
    {
        id: 15,
        name: 'PC Gamer Weed',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: '2020-07-14T10:00:00Z',
        imgUrl: 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/15-big.jpg',
        price: 2200,
        categories: [
            { id: 3, name: 'Computer' },
            { id: 4, name: 'Closets' },
            { id: 5, name: 'Radio' },
        ],
    },

    {
        id: 10,
        name: 'PC Gamer Weed',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: '2020-07-14T10:00:00Z',
        imgUrl: 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/15-big.jpg',
        price: 2200,
        categories: [{ id: 3, name: 'Computer' }],
    },
];

export const List = () => {
    return (
        <>
            <Flex
                w="100%"
                align={['center']}
                gap="5"
                flexWrap={['wrap-reverse', 'wrap-reverse', 'nowrap']}
            >
                <Button
                    w={['100%', '100%', '12%']}
                    h={['40px', '40px', '60px']}
                    colorScheme="blue"
                >
                    Adicionar
                </Button>

                <Filter />
            </Flex>

            <Flex w="100%" gap="5" flexDir="column" mt="6">
                {products.map((product) => (
                    <Box key={product.id}>
                        <CardRowProduct product={product} />
                    </Box>
                ))}
            </Flex>
        </>
    );
};
