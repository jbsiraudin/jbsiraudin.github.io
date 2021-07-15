import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function Home() {
  return (
    <Layout description="Yet another game designer blog">
      <main>
        <div className="prose">
          <p>Hi, I'm JB, previz & game designer at Ubisoft Paris.</p>
          <p>
            <strong>I enjoy making games and experiences that makes you think differently</strong>.
            I also practice maths, graphics programming and writing as a hobbyist.
          </p>
          <p>
            This website will store various <Link to="/blog">blog posts</Link> about game design,
            science and hopefully some interactive tools/experiments too.
          </p>
          <p>Enjoy your stay ☕</p>
        </div>
      </main>
    </Layout>
  );
}
