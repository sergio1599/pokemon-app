import { NextPage } from "next";
import { Layout } from "../components/layouts";
import { Card, Container, Grid, Text } from "@nextui-org/react";
import Image from "next/image";

export const Custom404Page: NextPage = () => {
  return (
    <Layout title="No found pokemon">
      <Grid.Container css={{ marginTop: "10px" }} justify="center">
        <Card
          css={{ alignSelf: "center", maxWidth: "600px", maxHeight: "600px" }}
        >
          <Card.Body>
            <Container
              css={{ minHeight: "80vh", height: "100%" }}
              direction="column"
              display="flex"
              justify="space-between"
              alignItems="center"
            >
              <Text h1>El pokemon no existe</Text>
              <Image
                src={"/images/pikachu-sad.gif"}
                alt="pikachu-sad"
                width={'400%'}
                height={'400%'}
                style={{ borderRadius: "14px" }}
              />
            </Container>
          </Card.Body>
        </Card>
      </Grid.Container>
    </Layout>
  );
};

export default Custom404Page;
