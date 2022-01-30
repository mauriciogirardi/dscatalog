export const formatPrice = (price: number) => {
    const params = {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    };

    return new Intl.NumberFormat('pt-BR', params).format(price);
};

export const textDots = (text: string, limit: number): string | undefined => {
    const aboveLimit = text.length > limit;
    const dotsOrEmpty = aboveLimit ? '...' : '';
    return text.substring(0, limit) + dotsOrEmpty;
};
