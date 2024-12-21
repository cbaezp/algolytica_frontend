import Script from "next/script";
const PricingTable = ({ user_email }) => {
  return (
    <>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>

      {/* TEST TABLE DATA */}
      <stripe-pricing-table
        pricing-table-id="prctbl_1NwVKqKkfU88qxTIj8oaagWs"
        publishable-key="pk_live_51NtucNKkfU88qxTIqcpnRxjJUng7vLpd48yL7z7Nko6IE4BdbNF0zSyWZFJatFsxEKBzohIEj7f3kcTcUCq2Z0lI00uhCo6UWV"
        customer-email={user_email}
      ></stripe-pricing-table>
    </>
  );
};

export default PricingTable;
