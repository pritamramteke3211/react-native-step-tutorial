import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type TutorialStep = {
  description: string,
  layout?: ViewStyle,
  renderHighlight?: (layout: ViewStyle) => JSX.Element,
};

type Props = {
  steps: TutorialStep[],
  currentStep: number,
  visible: boolean,
  onPrev: () => void,
  onNext: () => void,
  onDone: () => void,
};

export const TutorialOverlay: React.FC<Props> = ({
  steps,
  currentStep,
  visible,
  onPrev,
  onNext,
  onDone,
}) => {
  if (!visible || !steps[currentStep]?.layout) {
    return null;
  }

  const { layout, description, renderHighlight } = steps[currentStep];

  console.log("layout", layout);

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.overlay} />

      {renderHighlight?.({ ...layout, margin: 0 })}

      {/* Instruction + Controls */}
      <View style={styles.whiteboard}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  whiteboard: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
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
