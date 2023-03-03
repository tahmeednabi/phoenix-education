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
          <h1 className="px-6">404</h1>
          <h1 className="px-6 font-normal">Page not found</h1>
        </div>
      </div>
    </div>
  );
}
