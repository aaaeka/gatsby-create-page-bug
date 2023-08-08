import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";

type Props = {
  children: React.ReactNode;
};

export default function MDXPageTemplate(props: Props) {
  return <MDXProvider>{props.children}</MDXProvider>;
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
    }
  }
`;
