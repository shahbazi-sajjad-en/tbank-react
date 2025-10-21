import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export function CustomLoadingOverlay() {
  return (
 
      <Box
        sx={{
          position: "absolute", // حتماً position absolute
          top: 0,
        background:"red",
          left: 0,
          width: "100%",
          height: "100%", // پوشش کل DataGrid
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          p: 2,
          bgcolor: "rgba(255,255,255,0.7)" // اختیاری، برای دیده شدن اسکلتون‌ها
        }}
      >
        {[...Array(10)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={40}
            sx={{ mb: 1, borderRadius: 1 }}
          />
        ))}
      </Box>

  );
}
