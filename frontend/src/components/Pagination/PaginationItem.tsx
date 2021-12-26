import { Button } from '@chakra-ui/react';

type PaginationItemProps = {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
};

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        bg="blue.400"
        colorScheme="blue"
        disabled
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      onClick={() => onPageChange(number)}
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      colorScheme="blue"
    >
      {number}
    </Button>
  );
}
