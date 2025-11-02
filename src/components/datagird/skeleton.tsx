import { Skeleton, Box } from "@mui/material";

interface CustomSkeletonOverlayProps {
  count: number;
}

export const CustomSkeletonOverlay = ({ count }: CustomSkeletonOverlayProps) => {
  const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const rows = count || 5; // اگر count نبود، 5 ردیف پیش‌فرض

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Box key={rowIndex} sx={{ display: "flex", gap: 1 }}>
          {columns.map((colIndex) => (
            <Skeleton
              key={colIndex}
              variant="text"
              height={50}
              sx={{ flex: 1, borderRadius: 1, background: '#0000001c' }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};
