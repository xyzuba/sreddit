import { Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { useUserQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetIntId } from "../../utils/useGetIntId";

const Profile = () => {
  const intId = useGetIntId();
  const [{ data }] = useUserQuery({
    variables: {
      id: intId,
    },
  });

  if (!data?.user) {
    return <div>No user</div>;
  }

  return (
    <Layout>
      <Heading>
        <span>This is </span>
        <span>{data.user.username}</span>
        <span>'s page</span>
      </Heading>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Profile);
