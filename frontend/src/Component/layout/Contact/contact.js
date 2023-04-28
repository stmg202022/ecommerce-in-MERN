import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const ContactUsPage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
          padding: "2rem",
          bgcolor: "#f7f7f7",
          borderRadius: "8px",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
            width: "100%",
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            sx={{ marginBottom: "1rem", width: "100%" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            sx={{ marginBottom: "1rem", width: "100%" }}
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            sx={{ marginBottom: "1rem", width: "100%" }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              marginTop: "1rem",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Send Message
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactUsPage;
