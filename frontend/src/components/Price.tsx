import { Flex, Text } from '@chakra-ui/react';
import { formatPrice } from 'utils/formatters';

type PriceProps = {
    amount: number;
    brlSize?: string;
    realSize?: string;
    centSize?: string;
    color?: string;
};

export const Price = ({
    amount,
    brlSize = '12',
    centSize = '14',
    realSize = '20',
    color = 'blue.400',
}: PriceProps) => {
    const [real, cents] = String(formatPrice(amount)).split(',');

    return (
        <Flex align="center" mt="2">
            <Text
                fontWeight={500}
                color="gray.300"
                fontSize={brlSize}
                mt="-5px"
                mr="1"
            >
                R$
            </Text>
            <Text fontSize={realSize} fontWeight={800} color={color}>
                {real}
            </Text>
            <Text fontWeight={800} color={color} fontSize={centSize} mt="5px">
                ,{cents}
            </Text>
        </Flex>
    );
};
