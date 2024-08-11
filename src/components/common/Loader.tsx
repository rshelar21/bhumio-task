import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      width="100%"
      height="100%"
      position="absolute"
      bgcolor="rgba(0,0,0,0.05)"
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default Loader;
