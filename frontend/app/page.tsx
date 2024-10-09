"use client";
import Image from "next/image";
import { Images } from "@/images";
import { Box, Button, Typography } from "@mui/material";
import { useLanguage } from "@/context/Lang/LangContext";

export default function Home() {
  const lang = useLanguage();

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
          <Typography variant="h5" gutterBottom fontWeight={600}>
            {lang.language.newArrival}
          </Typography>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: "800", color: "#B88E2F" }}
          >
            {lang.language.discoverCollection}
          </Typography>
          <Typography variant="body1">
            {lang.language.introduceContent}
          </Typography>
          <Box
            style={{
              marginTop: 60,
              marginLeft: 460
            }}
          >
            <Button variant="contained" className="medium-btn" style={{ backgroundColor: '#B88E2F' }}>
              {lang.language.buyNow}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
