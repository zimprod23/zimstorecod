import React from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import pic404 from "./pixar.png";

function Page404() {
  return (
    <div>
      <Container maxWidth="lg">
        <Box p={10}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <img src={pic404} alt="pixar ooof" />
            </Grid>
            <br />
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography variant="h2" gutterBottom>
                AWWW...D'ONT CRY
              </Typography>
              <Typography variant="h4" gutterBottom>
                its just a 404 Error !
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Page404;
