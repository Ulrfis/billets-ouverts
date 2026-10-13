import { Suspense, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { ArrowLeft, ArrowRight, Bookmark, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { keepTrace, useStore } from "@/lib/store";
import { hasTrace } from "@/lib/traces";
import type { IceQuote } from "@/lib/ice-quotes";
import { useReader } from "./ReaderContext";
import cloudscape from "@/assets/ice-cloudscape.jpg";

type Palette = { sky: string; ice: string; edge: string; ink: string; light: string };
type Journey = { distance: number; target: number | null; inspected: boolean; active: number };
const SPACING = 16;
const cubeX = (i: number) => i === 0 ? -2.8 : i % 2 === 0 ? -5.8 : 6.5;

function quoteTexture(quote: IceQuote, ink: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024; canvas.height = 1024;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);
  // Wrap and fit the complete quote, never truncate. Long texts also open at reading size.
  let fontSize = 66;
  let lines: string[] = [];
  const paragraphs = quote.text.split("\n");
  do {
    context.font = `500 ${fontSize}px "Playfair Display", Georgia, serif`;
    lines = [];
    for (const paragraph of paragraphs) {
      let line = "";
      for (const word of paragraph.split(/\s+/)) {
        const next = line ? `${line} ${word}` : word;
        if (context.measureText(next).width > 820 && line) { lines.push(line); line = word; }
        else line = next;
      }
      lines.push(line);
    }
    if (lines.length * fontSize * 1.32 <= 690) break;
    fontSize -= 2;
  } while (fontSize > 8);
  context.fillStyle = ink;
  context.textAlign = "center";
  context.textBaseline = "middle";
  const height = lines.length * fontSize * 1.32;
  lines.forEach((line, i) => context.fillText(line, 512, 470 - height / 2 + i * fontSize * 1.32, 840));
  if (quote.year !== null) {
    context.font = '400 30px "Roboto", sans-serif';
    context.fillText(String(quote.year), 512, Math.max(730, 500 + height / 2), 820);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Glacier({ quote, index, palette, reduced, journey, onInspect }: {
  quote: IceQuote; index: number; palette: Palette; reduced: boolean;
  journey: RefObject<Journey>; onInspect: (index: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const time = useRef(index * 1.7);
  const texture = useMemo(() => quoteTexture(quote, palette.ink), [quote, palette.ink]);
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame((_, rawDelta) => {
    const object = group.current;
    if (!object) return;
    if (!reduced) time.current += Math.min(rawDelta, .05);
    const t = time.current;
    object.position.set(cubeX(index) + Math.sin(t * .19) * .55, .7 + Math.sin(t * .27) * .5, -index * SPACING);
    object.rotation.set(.06 + Math.sin(t * .17) * .065, .24 + Math.sin(t * .15) * .16, -.06 + Math.sin(t * .13) * .07);
    object.visible = Math.abs(-index * SPACING + journey.current.distance) < 67;
  });
  return <group ref={group} position={[cubeX(index), .7, -index * SPACING]}>
    <RoundedBox args={[8.4, 7.8, 4.6]} radius={.65} smoothness={4} onClick={(event) => { event.stopPropagation(); onInspect(index); }}>
      <MeshTransmissionMaterial transmissionSampler samples={4} transmission={1} thickness={3.2} roughness={.065} depthWrite={false}
        ior={1.31} chromaticAberration={.025} anisotropicBlur={.025} distortion={.035} distortionScale={.23}
        temporalDistortion={reduced ? 0 : .035} color={palette.ice} attenuationColor={palette.edge} attenuationDistance={15}
        clearcoat={1} clearcoatRoughness={.08} />
    </RoundedBox>
    <mesh position={[0, .15, .35]} renderOrder={10} onClick={(event) => { event.stopPropagation(); onInspect(index); }}>
      <planeGeometry args={[6.7, 6.7]} />
      <meshBasicMaterial map={texture} transparent alphaTest={.05} depthWrite toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
    {/* Inner seams establish real depth rather than a flat glass panel. */}
    <RoundedBox args={[7.8, 7.2, 4.05]} radius={.5} smoothness={2}>
      <meshBasicMaterial color={palette.edge} wireframe transparent opacity={.035} depthWrite={false} />
    </RoundedBox>
  </group>;
}

function Sky({ palette, journey }: { palette: Palette; journey: RefObject<Journey> }) {
  const texture = useTexture(cloudscape);
  const backdrop = useRef<THREE.Mesh>(null);
  texture.colorSpace = THREE.SRGBColorSpace;
  useFrame(({ camera }) => {
    backdrop.current?.position.set(camera.position.x * .1, 0, -journey.current.distance - 95);
  });
  return <>
    <color attach="background" args={[palette.sky]} />
    <mesh ref={backdrop} position={[0, 0, -95]}>
      <planeGeometry args={[260, 145]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
    <Environment resolution={128}>
      <Lightformer intensity={3} color={palette.light} position={[0, 12, 5]} scale={[30, 20, 1]} />
      <Lightformer intensity={2} color={palette.edge} position={[-18, 3, 0]} rotation-y={Math.PI / 2} scale={[25, 12, 1]} />
      <Lightformer intensity={4} color={palette.light} position={[16, 0, -12]} rotation-y={-Math.PI / 2} scale={[5, 25, 1]} />
    </Environment>
  </>;
}

function DriftCamera({ journey, count, reduced, onActive }: {
  journey: RefObject<Journey>; count: number; reduced: boolean; onActive: (index: number) => void;
}) {
  const time = useRef(0);
  useFrame(({ camera, pointer, size }, rawDelta) => {
    const dt = Math.min(rawDelta, .05);
    const j = journey.current;
    if (!reduced) time.current += dt;
    if (j.target !== null) {
      j.distance = THREE.MathUtils.damp(j.distance, j.target, 2.2, dt);
      if (Math.abs(j.distance - j.target) < .05) j.target = null;
    } else if (!reduced && !j.inspected) {
      j.distance += .62 * dt;
      if (j.distance > (count - 1) * SPACING + 10) j.target = 0;
    }
    const nearest = Math.min(count - 1, Math.max(0, Math.round(j.distance / SPACING)));
    if (nearest !== j.active) { j.active = nearest; onActive(nearest); }
    const narrow = size.width < 600;
    const z = (narrow ? 24 : 16) - j.distance;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, cubeX(nearest) * .4 + pointer.x * .65, 1.5, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, .3 + Math.sin(time.current * .2) * .3 + pointer.y * .35, 1.5, dt);
    camera.position.z = z;
    camera.lookAt(camera.position.x * .85, .8, z - 35);
  });
  return null;
}

export default function IceWorld({ quotes }: { quotes: IceQuote[] }) {
  const { reducedMotion } = useReader();
  const [palette, setPalette] = useState<Palette | null>(null);
  const [active, setActive] = useState(0);
  const [inspected, setInspected] = useState<number | null>(null);
  const journey = useRef<Journey>({ distance: 0, target: null, inspected: false, active: 0 });
  const root = useRef<HTMLDivElement>(null);
  const traces = useStore((state) => state.traces);
  const quote = quotes[inspected ?? active];
  const kept = quote ? hasTrace(traces, "citation", quote.id, quote.text) : false;
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const canvas = document.createElement("canvas"); canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const color = (name: string) => {
      if (!context) return "";
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = css.getPropertyValue(name).trim(); context.fillRect(0, 0, 1, 1);
      const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
      return `rgb(${r}, ${g}, ${b})`;
    };
    setPalette({ sky: color("--ice-sky"), ice: color("--ice-glass"), edge: color("--ice-edge"), ink: color("--ice-ink"), light: color("--ice-light") });
  }, []);
  const move = (index: number) => {
    const next = (index + quotes.length) % quotes.length;
    journey.current.target = next * SPACING;
    setInspected(null); journey.current.inspected = false;
  };
  const inspect = (index: number) => {
    setInspected(index); journey.current.inspected = true;
  };
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof Element && event.target.closest("input, textarea, [contenteditable=true], .reader-sidebar, [data-slot=sheet-content]")) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(active + (event.key === "ArrowRight" ? 1 : -1)); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, quotes.length]);
  if (!quotes.length) return <p role="status" className="p-8 text-muted-foreground">Aucune citation renseignée dans Résonances.</p>;
  return <div ref={root} className="ice-world" data-testid="ice-world" onWheel={(event) => {
    if (inspected === null) journey.current.target = Math.max(0, Math.min((quotes.length - 1) * SPACING, journey.current.distance + event.deltaY * .012));
  }}>
    {palette && <Canvas dpr={[1, 1.35]} camera={{ position: [0, .3, 20], fov: 55, near: .1, far: 180 }} gl={{ antialias: true }} fallback={<p className="p-8">L’espace 3D n’est pas disponible sur cet appareil.</p>}>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <Sky palette={palette} journey={journey} />
        {quotes.map((item, i) => <Glacier key={item.id} quote={item} index={i} palette={palette} reduced={reducedMotion} journey={journey} onInspect={inspect} />)}
        <DriftCamera journey={journey} count={quotes.length} reduced={reducedMotion} onActive={setActive} />
      </Suspense>
    </Canvas>}
    {quote && <div className="ice-navigation">
      <Button variant="ghost" size="icon" aria-label="Citation précédente" title="Citation précédente" onClick={() => move(active - 1)}><ArrowLeft aria-hidden /></Button>
      <Button variant="ghost" className="ice-read-trigger" onClick={() => inspect(active)} aria-label="Lire la citation entière">{quote.year ?? "Résonances"}<span className="text-xs text-muted-foreground">{active + 1} / {quotes.length}</span></Button>
      <Button variant="ghost" size="icon" aria-label="Citation suivante" title="Citation suivante" onClick={() => move(active + 1)}><ArrowRight aria-hidden /></Button>
      <Button variant="ghost" size="icon" disabled={kept} aria-label={kept ? "Citation gardée" : "Garder cette citation"} title={kept ? "Citation gardée" : "Garder cette citation"} onClick={() => keepTrace({ kind: "citation", passageId: quote.id, text: quote.text, excerpt: `Résonances${quote.year === null ? "" : ` · ${quote.year}`}` })}>{kept ? <Check aria-hidden /> : <Bookmark aria-hidden />}</Button>
    </div>}
    {inspected !== null && quote && <div className="ice-reading" role="region" aria-label="Citation entière">
      <Button variant="ghost" size="icon" className="ice-reading-close" aria-label="Revenir aux glaçons" title="Revenir aux glaçons" onClick={() => { setInspected(null); journey.current.inspected = false; }}><X aria-hidden /></Button>
      <blockquote><p>{quote.text}</p>{quote.year !== null && <footer>{quote.year}</footer>}</blockquote>
      <Button variant="ghost" disabled={kept} onClick={() => keepTrace({ kind: "citation", passageId: quote.id, text: quote.text, excerpt: `Résonances${quote.year === null ? "" : ` · ${quote.year}`}` })}>{kept ? <Check aria-hidden /> : <Bookmark aria-hidden />}{kept ? "Gardée" : "Garder cette citation"}</Button>
    </div>}
  </div>;
}