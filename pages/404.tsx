import Head from "next/head";

export default function Index() {
  return (
    <div>
      <Head>
        <title>Not Found | Phoenix Education</title>
        <meta name="description" content="" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex items-center justify-center h-[calc(100vh-18rem)]">
        <div className="flex items-center divide-x divide-y-0 divide-solid divide-gray-400">
          <h3 className="text-3xl px-6">404</h3>
          <h3 className="text-3xl px-6 font-light">Page not found</h3>
        </div>
      </div>
    </div>
  );
}
