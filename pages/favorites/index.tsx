import { Layout } from "../../components/layouts/Layout";
import { NoFavorites } from "../../components/ui";
import { useEffect, useState } from "react";
import { localFavorites } from "../../utils";
import { Card, Grid } from "@nextui-org/react";
import { FavoritePokemons } from "../../components/pokemon";

export const FavoritesPage = () => {
  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setfavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Pokemon - Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons pokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
