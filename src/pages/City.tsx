import { useParams } from "react-router-dom";
import { getCity } from "../api";
import { useQuery } from "react-query";
import { Typography } from "@mui/material";
import { Box } from ".pnpm/@mui+system@5.0.6_0c6b44af47723f3fbfad0689dde655a8/node_modules/@mui/system";

interface urlParams {
  id: string;
}

function City() {
  const { id } = useParams<urlParams>();
  const { data, isLoading, error } = useQuery(["city", id], () => getCity(+id));
  if (data) {
    const { country, id, name } = data.data;

    return (
      <div>
        <div
          style={{
            width: "100%",
            height: 175,
            position: "relative"
          }}
        >
          <img
            src={`https://source.unsplash.com/featured/?${name}`}
            alt={name}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1,
              opacity: 0.4
            }}
          />
          <Box
            sx={{
              top: "50%",
              position: "relative",
              transform: "translateY(-50%)"
            }}
            display="flex"
            flexDirection="column"
          >
            <Typography variant="h4" textAlign="center">
              {name}
            </Typography>
            <Box color="text.secondary">
              <Typography variant="h5" textAlign="center">
                {country}
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
    );
  }

  return null;
}

export default City;
