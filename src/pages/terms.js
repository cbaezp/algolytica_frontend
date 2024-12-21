import fs from "fs";
import matter from "gray-matter";
import dynamic from "next/dynamic";
import Layout from "../hocs/Layout";
import Terms from "../components/Terms";

// The Blog Page Content
export default function terms() {
  return (
    <Layout
      title={"Terms of Service | Odds73"}
      content={
        "From data-driven strategies to cutting-edge technology, stay ahead of the game with our comprehensive coverage of the intersection between sports and analytics."
      }
    >
      <Terms />
    </Layout>
  );
}
