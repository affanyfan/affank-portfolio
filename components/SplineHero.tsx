// Server component. Uses Spline's official Next.js entry point, which renders
// an auto-generated preview poster while the 3D scene loads, then swaps it in.
// No "use client" here: this is the supported way to load Spline in Next.js.
import Spline from "@splinetool/react-spline/next";

type SplineHeroProps = {
  /** Your published Spline scene URL, e.g. https://prod.spline.design/xxxx/scene.splinecode */
  scene: string;
};

export default function SplineHero({ scene }: SplineHeroProps) {
  return (
    <div className="spline-hero">
      <Spline scene={scene} />
    </div>
  );
}
