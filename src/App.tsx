import { Canvas } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import { SheetProvider, editable as e } from "@theatre/r3f";
import { PerspectiveCamera } from "@theatre/r3f";
import extension from "@theatre/r3f/dist/extension";
import studio from "@theatre/studio";

import { useEffect } from "react";
import demoProjectState from "./state.json";

if (import.meta.env.DEV) {
  studio.initialize();
  studio.extend(extension);
}

const demoSheet = getProject("Demo Project", { state: demoProjectState }).sheet(
  "Demo Sheet",
);

const App = () => {
  useEffect(() => {
    demoSheet.project.ready.then(() =>
      demoSheet.sequence.play({
        iterationCount: Number.POSITIVE_INFINITY,
        range: [0, 4],
      }),
    );
  }, []);

  return (
    <main className="h-full w-full">
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <SheetProvider sheet={demoSheet}>
          <PerspectiveCamera
            theatreKey="Camera"
            makeDefault
            position={[5, 5, 5]}
            fov={75}
          />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <e.mesh theatreKey="mesh">
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </e.mesh>
        </SheetProvider>
      </Canvas>
    </main>
  );
};

export default App;
