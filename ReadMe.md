# 🧠 React Native Tutorial Overlay

A lightweight and customizable React Native tutorial/onboarding library that walks users through your app using step-by-step highlights and contextual tooltips. Perfect for onboarding flows, feature introductions, and guiding users through complex UIs.

---

## ✨ Features

- 🔍 Highlight any component with smooth overlays

- 🧩 Customizable steps with layout-aware rendering

- ⏭️ Next, Previous, and Done controls

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

import React, {useEffect} from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {useTutorial} from 'react-native-tutorial-overlay';

import {TutorialOverlay} from 'react-native-tutorial-overlay';

const Example = () => {

const {

stepRefs,

steps,

setSteps,

currentStep,

setCurrentStep,

visible,

setVisible,

handleLayout,

} = useTutorial();

useEffect(() => {

setSteps([

{

description: 'This is your profile icon!',

renderHighlight: layout => (

style={{

...styles.tabCont,

...layout,

}}>

👤 Profile

),

},

{

description: 'Check your notifications here!',

renderHighlight: layout => (

style={{

...styles.tabCont,

...layout,

}}>

🔔 Notifications

),

},

{

description: 'Change your settings here!',

renderHighlight: layout => (

style={{

...styles.tabCont,

...layout,

}}>

⚙️ Settings

),

},

{

description: 'Send an SMS here!',

renderHighlight: layout => (

style={{

...styles.tabCont,

...layout,

}}>

💬 SMS

),

},

]);

}, [setSteps]);

return (

style={styles.tabCont}

ref={ref => (stepRefs.current[0] = ref)}>

👤 Profile

style={styles.tabCont}

ref={ref => (stepRefs.current[1] = ref)}>

🔔 Notifications

style={styles.tabCont}

ref={ref => (stepRefs.current[2] = ref)}>

⚙️ Settings

style={styles.tabCont}

ref={ref => (stepRefs.current[3] = ref)}>

💬 SMS

steps={steps}

currentStep={currentStep}

visible={visible}

onPrev={() => setCurrentStep(prev => prev - 1)}

onNext={() => setCurrentStep(prev => prev + 1)}

onDone={() => setVisible(false)}

/>

);

};

export default Example;

const styles = StyleSheet.create({

subCont: {

flexDirection: 'row',

justifyContent: 'space-between',

marginHorizontal: 5,

},

tabTxt: {

fontSize: 25,

color: 'white',

},

cont: {

flex: 1,

padding: 10,

gap: 10,

},

tabCont: {

backgroundColor: '#d3b50a',

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
