import { Typography } from "@mui/material";

interface Prop {
  text: string;
}

export const TruncatedText = ({ text }: Prop) => {
  return (
    <Typography
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      variant="h6"
      component="div"
    >
      {text}
    </Typography>
  );
};
