import { Pricing } from "modules/pricing/Pricing";
import Head from "next/head";

export default function _Pricing() {
  return (
    <div>
      <Head>
        <title>Pricing | Phoenix Education</title>
        <meta name="description" content="" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Pricing />
    </div>
  );
}
