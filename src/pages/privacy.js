import Layout from "../hocs/Layout";
import Privacy from "../components/Privacy";

// The Blog Page Content
export default function privacy() {
  return (
    <Layout
      title={"Terms | Algolytica"}
      content={
        "From data-driven strategies to cutting-edge technology, stay ahead of the game with our comprehensive coverage of the intersection between sports and analytics."
      }
    >
      <Privacy />
    </Layout>
  );
}
