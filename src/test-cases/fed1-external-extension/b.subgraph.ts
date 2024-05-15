import { createSubgraph } from "../../subgraph";
import { users } from "./data";

export default createSubgraph("b", {
  typeDefs: /* GraphQL */ `
    type Query {
      userById(id: ID): User
    }

    type User @key(fields: "id") {
      id: ID!
      name: String!
      nickname: String
    }
  `,
  resolvers: {
    Query: {
      userById: (_: {}, { id }: { id: string }) => {
        const user = users.find((u) => u.id === id);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          nickname: user.nickname,
        };
      },
    },
    User: {
      __resolveReference: (key: { id: string }) => {
        const user = users.find((u) => u.id === key.id);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          nickname: user.nickname,
        };
      },
    },
  },
});