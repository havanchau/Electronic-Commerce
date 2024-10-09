import Image from "next/image";
import { Images } from "@/images";
import { Box } from "@mui/material";

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
          height: "600px",
        }}
      >
        <Image
          src={Images.background}
          alt="Eco-Friendly Products"
          layout="fill"
          style={{ objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
}
