import { useRef, useState } from "react";
import { View, ViewStyle } from "react-native";

type Layout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type TutorialStep = {
  description: string;
  layout?: ViewStyle;
  renderHighlight?: (layout: ViewStyle) => JSX.Element;
};

const useTutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const stepRefs = useRef<Array<View | null>>([]);

  const [steps, setSteps] = useState<TutorialStep[]>([]);

  const handleLayout = () => {
    Promise.all(
      stepRefs.current.map(
        (ref) =>
          new Promise<Layout>((resolve) => {
            ref?.measureInWindow?.((x, y, width, height) =>
              resolve({ x, y, width, height })
            );
          })
      )
    ).then((positions) => {
      console.log("positions", positions);
      const updatedSteps = steps.map((step, index) => ({
        ...step,
        layout: {
          top: positions[index].y,
          left: positions[index].x,
          width: positions[index].width,
          height: positions[index].height,
        },
      }));
      setSteps(updatedSteps);
    });
  };

  return {
    stepRefs,
    steps,
    setSteps,
    currentStep,
    setCurrentStep,
    visible,
    setVisible,
    handleLayout,
  };
};

export default useTutorial;
