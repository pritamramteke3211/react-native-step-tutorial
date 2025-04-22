# 🧠 React Native Step Tutorial

A lightweight and customizable React Native tutorial/onboarding library that walks users through your app using step-by-step highlights and contextual tooltips. Perfect for onboarding flows, feature introductions, and guiding users through complex UIs.

---

<!-- ![This is a Preview.](/rnstDemoGif.gif "\\This is a Preview.") -->

![This is a Preview.](https://i.imgur.com/3v6AGAi.gif "This is a Preview.")

## ✨ Features

- 🔍 Highlight any component with smooth overlays

- 🧩 Customizable steps with layout-aware rendering

- ⏭️ Next, Previous, and Done controls

- 🔄 Restart Tutorial Anytime with a single function call

- 💡 Simple API using React Hooks

- 📱 Built with `react-native` — no native modules required

---

## 📦 Installation

```bash

npm install react-native-tutorial-overlay

# or

yarn add react-native-tutorial-overlay

```

---

## 🚀 Basic Usage

Here's a complete example showing how to implement the tutorial overlay:

```jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { TutorialOverlay, useTutorial } from "react-native-step-tutorial";

const Example = () => {
  const tutLis = [
    {
      description: "This is your profile icon!",
      renderHighlight: (layout) => (
        <TouchableOpacity style={{ ...styles.profileIcm, ...layout }}>
          <Text style={styles.tabTxt}>👤</Text>
        </TouchableOpacity>
      ),
    },
    {
      description: "Check your notifications here!",
      renderHighlight: (layout) => (
        <TouchableOpacity
          style={{
            ...styles.tabCont,
            ...layout,
          }}
        >
          <Text style={styles.tabTxt}>🔔 Notifications</Text>
        </TouchableOpacity>
      ),
    },
    {
      description: "Change your settings here!",
      renderHighlight: (layout) => (
        <TouchableOpacity
          style={{
            ...styles.tabCont,
            ...layout,
          }}
        >
          <Text style={styles.tabTxt}>⚙️ Settings</Text>
        </TouchableOpacity>
      ),
    },
    {
      description: "Send an SMS here!",
      renderHighlight: (layout) => (
        <TouchableOpacity
          style={{
            ...styles.tabCont,
            ...layout,
          }}
        >
          <Text style={styles.tabTxt}>💬 SMS</Text>
        </TouchableOpacity>
      ),
    },

    {
      description: "Open Home!",
      renderHighlight: (layout) => (
        <Text
          style={{ ...styles.tabTxt, ...layout }}
          ref={(ref) => (stepRefs.current[4] = ref)}
        >
          🏠
        </Text>
      ),
    },
    {
      description: "Open Search!",
      renderHighlight: (layout) => (
        <Text
          style={{ ...styles.tabTxt, ...layout }}
          ref={(ref) => (stepRefs.current[4] = ref)}
        >
          🔍
        </Text>
      ),
    },
    {
      description: "Open Camera!",
      renderHighlight: (layout) => (
        <Text
          style={{ ...styles.tabTxt, ...layout }}
          ref={(ref) => (stepRefs.current[4] = ref)}
        >
          📷
        </Text>
      ),
    },
    {
      description: "Open Orders!",
      renderHighlight: (layout) => (
        <Text
          style={{ ...styles.tabTxt, ...layout }}
          ref={(ref) => (stepRefs.current[4] = ref)}
        >
          📦
        </Text>
      ),
    },
  ];

  const {
    stepRefs,
    steps,
    currentStep,
    setCurrentStep,
    visible,
    setVisible,
    handleLayout,
    restartTutorial,
  } = useTutorial(tutLis);

  return (
    <View style={{ ...styles.cont }} onLayout={handleLayout}>
      <View style={{ ...styles.cont, padding: 10 }}>
        <TouchableOpacity
          style={styles.profileIcm}
          ref={(ref) => (stepRefs.current[0] = ref)}
        >
          <Text style={styles.tabTxt}>👤</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabCont}
          ref={(ref) => (stepRefs.current[1] = ref)}
        >
          <Text style={styles.tabTxt}>🔔 Notifications</Text>
        </TouchableOpacity>

        <View style={styles.subCont}>
          <TouchableOpacity
            style={styles.tabCont}
            ref={(ref) => (stepRefs.current[2] = ref)}
          >
            <Text style={styles.tabTxt}>⚙️ Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabCont}
            ref={(ref) => (stepRefs.current[3] = ref)}
          >
            <Text style={styles.tabTxt}>💬 SMS</Text>
          </TouchableOpacity>
        </View>

        <Button title="Restart Tutorial" onPress={restartTutorial} />
      </View>
      <TouchableOpacity
        style={styles.btmNav}
        //    ref={ref => (stepRefs.current[4] = ref)}
      >
        <Text style={styles.tabTxt} ref={(ref) => (stepRefs.current[4] = ref)}>
          🏠
        </Text>
        <Text style={styles.tabTxt} ref={(ref) => (stepRefs.current[5] = ref)}>
          🔍
        </Text>

        <Text style={styles.tabTxt} ref={(ref) => (stepRefs.current[6] = ref)}>
          📷
        </Text>
        <Text style={styles.tabTxt} ref={(ref) => (stepRefs.current[7] = ref)}>
          📦
        </Text>
      </TouchableOpacity>

      <TutorialOverlay
        steps={steps}
        currentStep={currentStep}
        visible={visible}
        onPrev={() => setCurrentStep((prev) => prev - 1)}
        onNext={() => setCurrentStep((prev) => prev + 1)}
        onDone={() => setVisible(false)}
      />
    </View>
  );
};

export default Example;

const styles = StyleSheet.create({
  btmNav: {
    position: "absolute",
    bottom: 0,
    padding: 10,
    backgroundColor: "#0ad37f",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  profileIcm: {
    backgroundColor: "#f0e330",
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    aspectRatio: 1,
  },
  subCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  tabTxt: {
    fontSize: 25,
    color: "white",
  },
  cont: {
    flex: 1,
    gap: 10,
  },
  tabCont: {
    backgroundColor: "#d3b50a",
    padding: 20,
    borderRadius: 10,
  },
});
```

### Key Implementation Notes:

1. **`useTutorial` hook**: Manages the tutorial state (steps, current step, visibility)

2. **`stepRefs`**: Array of refs to track components being highlighted

3. **`setSteps`**: Define your tutorial steps with descriptions and highlight components

4. **`TutorialOverlay`**: The component that renders the tutorial interface

5. **Navigation controls**: Implement `onPrev`, `onNext`, and `onDone` handlers

## 🗣️ Feedback & Support

Found a bug or have a feature request? Please open an issue on [GitHub](https://github.com/pritamramteke3211/react-native-step-tutorial/issues).
