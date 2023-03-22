import { gql } from "@apollo/client";

export const RacesDocument = gql`
  query Races {
    races {
      name
    }
  }
`;
