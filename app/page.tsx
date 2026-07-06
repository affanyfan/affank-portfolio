import SplineHero from "@/components/SplineHero";

export default function Home() {
  return (
    <main>
      {/* ── HERO ───────────────────────────────────────────────
          Replace `scene` with your published Spline URL. Spline auto-generates
          the loading poster, so there's nothing else to add.
          Spend your boldness here; keep the rest quiet. */}
      <section className="hero">
        <SplineHero scene="https://prod.spline.design/REPLACE_ME/scene.splinecode" />
        <div className="hero__copy">
          <h1>
            Hello, I&rsquo;m Affan.
            <br />A product designer in San Francisco.
          </h1>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <footer className="contact">
        <p>
          Find me on{" "}
          <a href="https://www.linkedin.com/in/affank">LinkedIn</a>,{" "}
          <a href="https://twitter.com/Affanyfan">Twitter</a>, and{" "}
          <a href="https://www.instagram.com/affanyfan">Instagram</a>. Or email{" "}
          <a href="mailto:affankhokhar@gmail.com">affankhokhar@gmail.com</a>.
        </p>
      </footer>
    </main>
  );
}
