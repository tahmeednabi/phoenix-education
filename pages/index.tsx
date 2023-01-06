import dynamic from "next/dynamic";

const Body = dynamic(() => import("../modules/Body"), {
  ssr: false,
});

export default function Home() {
  return <Body />;
}
