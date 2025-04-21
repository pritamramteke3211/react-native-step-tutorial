import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Dimensions,
} from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";

const insets = initialWindowMetrics?.insets;

const { width: scrn_width, height: scrn_height } = Dimensions.get("window");

const safe_top = insets?.top;
const safe_bottom = insets?.bottom;

type TutorialStep = {
  description: string;
  layout?: ViewStyle;
  renderHighlight?: (layout: ViewStyle) => JSX.Element;
};

type Props = {
  steps: TutorialStep[];
  currentStep: number;
  visible: boolean;
  onPrev: () => void;
  onNext: () => void;
  onDone: () => void;
};

export const TutorialOverlay: React.FC<Props> = ({
  steps,
  currentStep,
  visible,
  onPrev,
  onNext,
  onDone,
}) => {
  const [msgBoxPos, setmsgBoxPos] = useState(0);

  const contTutDis = 10;

  if (!visible || !steps[currentStep]?.layout) {
    return null;
  }

  const { layout, description, renderHighlight } = steps[currentStep];

  const safeHeight = scrn_height;
  -(safe_top + safe_bottom);

  const cItmLay = layout.top + layout.height;

  const handleMessageBoxLayout = (event) => {
    const { height } = event.nativeEvent.layout;

    setmsgBoxPos(height);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.overlay} />

      {renderHighlight?.({ ...layout, margin: 0 })}

      {/* Instruction + Controls */}
      <View
        onLayout={handleMessageBoxLayout}
        style={[
          styles.whiteboard,
          layout.left < scrn_width / 2
            ? { left: layout.left }
            : { right: scrn_width - layout.left - layout.width },
          layout.top + msgBoxPos + contTutDis < safeHeight
            ? {
                top: cItmLay + contTutDis,
              }
            : {
                top: layout.top - msgBoxPos - contTutDis,
              },
        ]}
      >
        <Text style={styles.description}>{description}</Text>
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.button, currentStep === 0 && styles.disabledButton]}
            onPress={onPrev}
            disabled={currentStep === 0}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          {currentStep < steps.length - 1 ? (
            <TouchableOpacity style={styles.button} onPress={onNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.doneButton} onPress={onDone}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={[
            styles.arrInd,
            layout.left < scrn_width / 2
              ? {
                  left: 10,
                }
              : {
                  right: 10,
                },

            layout.top + msgBoxPos + contTutDis < safeHeight
              ? {
                  borderBottomWidth: contTutDis / 1.4,
                  borderBottomColor: "#fff",
                  top: -contTutDis / 1.4,
                }
              : {
                  borderTopWidth: contTutDis / 1.4,
                  borderTopColor: "#fff",
                  bottom: -contTutDis / 1.4,
                },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  arrInd: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    position: "absolute",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  whiteboard: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "dodgerblue",
    borderRadius: 8,
  },
  doneButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "seagreen",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TutorialOverlay;
