import dynamic from "next/dynamic";
import Head from "next/head";

const Body = dynamic(() => import("../modules/Body"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Tahmeed Nabi - Full Stack Developer</title>
        <meta
          name="description"
          content="I am a full-stack developer with a 5+ years experience working with javascript frameworks, like Next.js, React.js, Node.js, NestJS and more."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Body />
    </>
  );
}
