"use client";

import React from "react";
import type { CSSProperties } from "react";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";

const WORK = [
  { title: "dyeary.ai", role: "Built & designed end to end", hover: "#8A5A24" },
  { title: "reducto.ai", role: "Design Engineer", hover: "#4B163D" },
  { title: "character.ai", role: "Staff Product Designer", hover: "#3E68FF" },
  { title: "Lyft", role: "Staff Product Designer", hover: "#FF00BF" },
  { title: "Meta", role: "Staff Product Designer", hover: "#0668E1" },
];

/** Statement — sticky paragraph whose words light up as you scroll through the section. */
function Statement() {
  const TEXT =
    "From idea to launch. I bring apps to life with high craft, delightful interactions, and backed by data. I've created design systems from scratch, built apps end to end, sweat the details, and vibe code the day away.";
  const words = TEXT.split(" ");
  const ref = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const dogPlayed = React.useRef(false);
  const [progress, setProgress] = React.useState(0);
  const [dogVisible, setDogVisible] = React.useState(false);

  // Phones get a portrait scene (man + dog) instead of the wide running strip
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Swapping src remounts the <video>; if the run was already triggered,
  // start the newly mounted variant instead of leaving it frozen.
  React.useEffect(() => {
    if (dogPlayed.current) videoRef.current?.play().catch(() => {});
  }, [isMobile]);

  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const raw = total > 0 ? -r.top / total : 1;
        const p = Math.min(1, Math.max(0, raw));
        setProgress(p);

        // The dog's run is baked into the video (one left-to-right pass).
        // Play it once when the reader is inside the statement. The video is
        // sticky-bottom: pinned to the viewport during the statement, then it
        // settles in flow directly above the footer and finishes its run
        // there. Never loops, never re-triggers.
        const v = videoRef.current;
        if (v && raw > 0.1 && !dogPlayed.current) {
          dogPlayed.current = true;
          setDogVisible(true);
          v.play().catch(() => {});
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const lit = Math.floor(progress * words.length);
  return (
    <section style={{ background: "var(--surface-page)" }}>
      <div ref={ref} style={{ height: "220vh" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 var(--space-5)",
            boxSizing: "border-box",
          }}
        >
        <p
          style={{
            margin: 0,
            maxWidth: 900,
            fontFamily: "var(--font-serif)",
            fontWeight: "var(--weight-bold)" as CSSProperties["fontWeight"],
            fontSize: "var(--text-title)",
            lineHeight: "150%",
            textAlign: "center",
            textWrap: "balance",
          }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              style={{
                color: i < lit ? "var(--text-primary)" : "rgba(0,0,0,0.18)",
                transition: "color 250ms ease",
              }}
            >
              {w}{" "}
            </span>
          ))}
          </p>
        </div>
      </div>
      <video
        key={isMobile ? "mobile" : "desktop"}
        ref={videoRef}
        src={isMobile ? "/dog-mobile.mp4" : "/dog-run.mp4"}
        muted
        playsInline
        preload="auto"
        style={{
          position: "sticky",
          bottom: 0,
          display: "block",
          width: "100%",
          height: "auto",
          pointerEvents: "none",
          opacity: dogVisible ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      />
    </section>
  );
}

export default function Home() {
  const lenis = useLenis();
  const scrollToVideo = () => {
    lenis?.scrollTo("#video-band");
  };

  // Snap only around the hero → video transition so the reel always lands
  // full-screen. Two snap targets (hero top, video band top) with proximity
  // snapping; the rest of the page scrolls freely.
  React.useEffect(() => {
    if (!lenis) return;
    const snap = new Snap(lenis, { type: "proximity", duration: 0.7 });
    snap.add(0);
    const band = document.getElementById("video-band");
    if (band) snap.addElement(band, { align: "start" });
    return () => snap.destroy();
  }, [lenis]);

  return (
    <div style={{ background: "var(--surface-page)", width: "100%" }}>
      {/* ── Hero — full viewport height; video sits below the fold ── */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 600,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-serif)",
            fontWeight: "var(--weight-bold)" as CSSProperties["fontWeight"],
            fontSize: "var(--text-display)",
            lineHeight: "var(--lh-tight)",
            color: "var(--text-primary)",
            textAlign: "center",
            padding: "0 var(--space-4)",
          }}
        >
          Hi, I&rsquo;m Affan
        </h1>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-serif)",
            fontWeight: "var(--weight-regular)" as CSSProperties["fontWeight"],
            fontSize: "var(--text-lead)",
            lineHeight: "var(--lh-tight)",
            color: "var(--text-muted)",
            textAlign: "center",
            padding: "0 var(--space-4)",
          }}
        >
          I&rsquo;m a product designer based in SF
        </p>

        {/* fade band + scroll cue */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 241,
            background: "var(--fade-to-tint)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
            justifyContent: "flex-end",
            paddingBottom: "var(--space-4)",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <div
            onClick={scrollToVideo}
            className="bounce-soft"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
              padding: "var(--space-3) var(--space-5)",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: "var(--weight-bold)" as CSSProperties["fontWeight"],
                fontSize: "var(--text-lead)",
                lineHeight: "var(--lh-tight)",
                color: "var(--text-primary)",
              }}
            >
              SCROLL
            </span>
            <img
              src="/chevron-down.svg"
              alt=""
              style={{ width: 24, height: 24, objectFit: "contain" }}
            />
          </div>
        </div>

        {/* grain: pre-baked semi-transparent noise PNG, clipped by the hero */}
        <img
          src="/noise-spec.png"
          alt=""
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
      </section>

      {/* ── Video band — full-bleed looping reel ── */}
      <section
        id="video-band"
        style={{
          height: "100vh",
          minHeight: 600,
          background: "var(--ink)",
        }}
      >
        <video
          src="/coloroptimized.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </section>

      {/* ── Work — editorial project list ── */}
      <section
        style={{
          minHeight: "100vh",
          background: "var(--surface-page)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px var(--space-5)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-serif)",
              fontWeight: "var(--weight-bold)" as CSSProperties["fontWeight"],
              fontSize: 16,
              lineHeight: "var(--lh-tight)",
              color: "#6B6052",
              width: "100%",
              textAlign: "center",
            }}
          >
            PAST WORK
          </h2>
          <ol
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              fontFamily: "var(--font-serif)",
              borderTop: "1px solid var(--hairline)",
            }}
          >
            {WORK.map((p) => (
              <li
                key={p.title}
                className="work-row"
                style={{ "--work-hover": p.hover } as CSSProperties}
              >
                <span className="work-title">{p.title}</span>
                <span className="work-role">{p.role}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Statement />

      {/* ── Footer — terracotta block with rounded top corners ── */}
      <footer
        style={{
          background: "var(--terracotta)",
          borderRadius: "32px 32px 0 0",
          padding: "64px clamp(24px, 5.5vw, 80px) 48px",
          fontFamily: "var(--font-serif)",
          color: "var(--bone)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "var(--space-5)",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
            }}
          >
            <span style={{ fontSize: "var(--text-caption)", opacity: 0.75 }}>
              Email :
            </span>
            <a
              href="mailto:affankhokhar@gmail.com"
              style={{
                fontSize: "var(--text-lead)",
                fontWeight: "var(--weight-bold)" as CSSProperties["fontWeight"],
                color: "var(--bone)",
              }}
            >
              affankhokhar@gmail.com
            </a>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
            }}
          >
            <span style={{ fontSize: "var(--text-caption)", opacity: 0.75 }}>
              Call Today :
            </span>
            <span
              style={{
                fontSize: "var(--text-lead)",
                fontWeight: "var(--weight-bold)" as CSSProperties["fontWeight"],
              }}
            >
              (848) 459 - 3805
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
            }}
          >
            <span style={{ fontSize: "var(--text-caption)", opacity: 0.75 }}>
              Social :
            </span>
            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
                fontSize: "var(--text-lead)",
                fontWeight: "var(--weight-bold)" as CSSProperties["fontWeight"],
              }}
            >
              <a
                href="https://www.linkedin.com/in/affank"
                style={{ color: "var(--bone)" }}
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/affanyfan"
                style={{ color: "var(--bone)" }}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(249,231,207,0.35)",
            marginTop: "var(--space-5)",
            paddingTop: "var(--space-4)",
            display: "flex",
            justifyContent: "space-between",
            gap: "var(--space-4)",
            flexWrap: "wrap",
            fontSize: "var(--text-caption)",
            opacity: 0.9,
          }}
        >
          <span>Based in San Francisco, CA. Open to relocate.</span>
          <span>Created by Affan</span>
        </div>
      </footer>
    </div>
  );
}
