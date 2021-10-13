import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function Home() {
  return (
    <Layout description="Yet another game designer blog">
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "65vh"
        }}
      >
        <div className="prose">
          <p>Hi, I'm Jean-Baptiste, previz & game designer at Ubisoft Paris.</p>
          <p>
            <strong>I enjoy making games and experiences that makes you think differently</strong>.
            I also practice maths, graphics programming, video editing and writing as a hobbyist. I
            studied maths, physics and mechanical engineering before trying my hand in design, and
            I'm still deeply attached to science topics.
          </p>
          <p>
            This website will store various <Link to="/blog">blog posts</Link> about game design,
            science and hopefully some interactive tools/experiments to go with.
          </p>
          <p>Enjoy your stay ☕</p>
        </div>
      </main>
    </Layout>
  );
}
