import { Box, Pagination, PaginationItem } from "@mui/material";

interface CustomPaginationProps {
    page: number;
    pageSize: number;
    rowCount: number;
    totalCount: number;
    client?: boolean;
    onPageChange: (page: number) => void;
}

const toPersianNumber = (num: number) =>
    num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

const CustomPagination: React.FC<CustomPaginationProps> = ({
    page,
    pageSize,
    rowCount,
    totalCount,
    client = false,
    onPageChange,
}) => {
    const totalPages = Math.ceil(client ? rowCount / pageSize : totalCount / pageSize);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
                py: 1,
            }}
        >
            <Pagination
                count={totalPages}
                page={page + 1}
                onChange={(e, value) => onPageChange(value - 1)}
                color="primary"
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        page={typeof item.page === "number" ? toPersianNumber(item.page) : item.page}
                    />
                )}
                sx={{
                    ".MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "primary.dark",
                        },
                    },
                }}
            />
        </Box>
    );
};

export default CustomPagination;
