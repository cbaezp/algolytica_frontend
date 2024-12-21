import Layout from "../hocs/Layout";
import { useSelector, useDispatch } from "react-redux";
import PricingTable from "../components/PricingTable";
const PricingPage = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <Layout>
      <PricingTable user_email={user} />
    </Layout>
  );
};

export default PricingPage;
