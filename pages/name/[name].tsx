import { useState } from "react";

import { NextPage, GetStaticProps } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticPaths } from "next";

import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { localFavorites, getPokemonInfo } from "../../utils";

import { pokeApi } from "../../api";
import confetti from "canvas-confetti";
import { PokemonListResponse } from "../../interfaces/pokemon-list";

interface Props {
  pokemon: Pokemon;
}

export const PokemonPageByName: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setisInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToogleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setisInFavorites(!isInFavorites);

    if (!isInFavorites) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      });
    }
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px", alignSelf: "center" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid direction="row" md={12}>
                <Text h1 transform="capitalize">
                  {pokemon.name} #{pokemon.id}
                </Text>

                <Button
                  css={{ marginTop: "20px", marginLeft: "auto" }}
                  color="gradient"
                  ghost={!isInFavorites}
                  onClick={onToogleFavorite}
                >
                  {isInFavorites ? "En favoritos" : "Guardar en favoritos"}
                </Button>
              </Grid>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokeApi.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokeApi.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokeApi.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokeApi.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
            <Card.Body>
              <Text size={30}>Types:</Text>
              <Container direction="row" display="flex" gap={0}>
                {pokemon.types.map((it, index) => {
                  return (
                    <Text size={20} key={index} transform="capitalize">
                      {it.type.name}
                    </Text>
                  );
                })}
              </Container>
            </Card.Body>
            <Card.Body>
              <Text size={30}>Movimientos:</Text>
              <Container direction="row" display="flex">
                {pokemon.moves.map((it, index) => {
                  return (
                    <Text size={20} key={index} transform="capitalize">
                      {it.move.name}
                    </Text>
                  );
                })}
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);
  const pokemonName: string[] = data.results.map(
    (pokemon) => pokemon.name as string
  );

  return {
    paths: pokemonName.map((name) => ({
      params: { name },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  const pokemon = await getPokemonInfo(name.toLowerCase());
  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonPageByName;
