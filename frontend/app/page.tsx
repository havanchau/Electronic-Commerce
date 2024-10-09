import Image from "next/image";
import { Images } from "@/images";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Box
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "700px",
        }}
      >
        <Image
          src={Images.background}
          alt="Eco-Friendly Products"
          layout="fill"
          style={{ objectFit: "cover" }}
        />

        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: 100,
            height: "80%",
            width: "40%",
            bgcolor: "#FFF3E3",
            padding: 10, 
            boxShadow: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Eco-Friendly Products
          </Typography>
          <Typography variant="body1">
            Discover our range of eco-friendly products designed to help you lead a sustainable lifestyle.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
