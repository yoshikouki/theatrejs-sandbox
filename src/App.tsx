import { Canvas } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import { SheetProvider, editable as e } from "@theatre/r3f";
import { PerspectiveCamera } from "@theatre/r3f";
import extension from "@theatre/r3f/dist/extension";
import studio from "@theatre/studio";

studio.initialize();
studio.extend(extension);

const App = () => {
  return (
    <main className="h-full w-full">
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <SheetProvider sheet={getProject("Demo Project").sheet("Demo Sheet")}>
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
