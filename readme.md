# React native the practical guide course follow-along

## Getting started

ReactJS is platform agnostic. React-dom is a library on top of it that is used for web development, React native is for creating platform agnostic mobile apps (IOS / Android).npm 

The react native specific JSX components like `<View>` or `<Text>` are compiled to their equivalent native elements on the respective platforms, the javascript logic itself is not.

![native components and react native components comparison](./readme_images/native_components.png)


Main react native site: https://reactnative.dev
Expo: https://docs.expo.dev/

2 Ways to build: Expo CLI and react Native CLI:

![expo vs native cli](./readme_images/expo_native_cli.png)

When creating a project using `expo init [projectname]`, react-dom and react-native-web are also added to `package.json` because theoretically web apps can also be built with react native; they are not needed for android / ios.

`app.json` contains configuration information for expo.

Course code:

https://github.com/academind/react-native-practical-guide-code

## Basics

Most important react native components: `View` (like `div`) and `Text` like span.

React native has a small set of [core components](https://reactnative.dev/docs/components-and-apis) that are the building blocks of an App, like html elements are the core components of `react-dom`.

There is no CSS, styles are written inline or as StyleSheet objects in javascript next to the component code. They react native styles are a subset of CSS.

**Styles don't cascade** - styles from parent elements like `color` aren't inherited by child elements. 

Example (App.tsx of a freshly generated project):

    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, Text, View } from 'react-native';

    export default function App() {
      return (
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app yay!</Text>
          <StatusBar style="auto" />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

`View`s can only contain other components, not e.g. plain text.

Using `StyleSheet.create` instead of a plain object offers IDE autocompletion and, potentially, optimization.

https://reactnative.dev/docs/style

Layout is generally handled using [Flexbox](https://reactnative.dev/docs/flexbox), similar to CSS Flexbox

*Every* view has flexbox enabled by default, so `flexDirection` etc. can be used immediately. Default is `flexDirection: 'column'` (unlike in a browser).

Flex reminder:

- `justifyContent`: how items are spaced on the main axis
- `alignItems`: how items are aligned on the cross axis (e.g. `center`) and how much space they take (e.g. `stretch`)
  - `flex` (set on flex child): takes space according to given number in relation to the `flex` properties set on the remaining children:


    // Item one taking all available space, item2 just what it needs for its content
    item1 {
        flex: 1 
    }
    
    item2: {
    
    }  
    
    // Item1 and Item2 take each 50% of the available space
    item1 {
        flex: 1
    }
    
    item2: {
        flex: 1
    }  
    
    // Item1 takes 75% of the space, item2 25%
    item1 {
        flex: 3
    }
    
    item2: {
        flex: 1
    }  

### Differences IOS / Android

- IOS text components can't have rounded corners (wrap with `View` as a workaround)

### Scrollable lists

`Views` are not scrollable (overflow will be hidden); `ScrollView` on the other hand is scrollable. The height of a `ScrollView` is determined by the parent, so wrap it in a view and set the height there (instead of just replacing `View` with `ScrollView`)

`ScrollView` has several configuration options and OS-specific behavior settings.

### Optimizing lists with FlatList

`ScrollView` always renders ALL items, which can be unperformant for very long lists.

`FlatList` will only render items that are visible (plus an internal buffer).

`FlatList` doesn't wrap manually rendered Items like View or ScrollView but receives a `data` prop for the items and a `renderItem` for the component.
If the passed `data` array contains a list of objects that each have a `key` member, the keys will be generated automatically. Alternatively, the property that should be used from the object can be defined with the `keyExtractor` prop on FlatList that expects a selector function, e.g. `keyExtractor={(item, index) => item.key}

ScrollView:

    <View style={styles.goalItems}>
        <ScrollView>
            {goals.map((goal) => (
                <View style={styles.goalItemWrapper} key={goal}>
                    <Text style={styles.goalItem}>{goal}</Text>
                </View>
            ))}
        </ScrollView>
    </View>

FlatList (using `keyExtractor`):

    type GoalType = {
        text: string;
        id: string;
    };

    // ...

    export default function App() {
        const [goals, setGoals] = useState<Array<GoalType>>([]);
        const [currentGoal, setCurrentGoal] = useState(createEmptyGoal());
        const goalInputHandler = (text: string) => setCurrentGoal({ ...currentGoal, text: text });
        const addGoalHandler = () => {
            if (
                !currentGoal.text.trim().length ||
                goals.find((goal) => goal.text === currentGoal.text.trim())
            )
                return;
            setGoals((prevState) => [...prevState, currentGoal]);
            setCurrentGoal(createEmptyGoal());
        };
    
        return (
                { /* ... * /}
                <View style={styles.goalItems}>
                    <FlatList
                        data={goals}
                        keyExtractor={(item) => item.id}
                        renderItem={(itemData) => (
                            <View style={styles.goalItemWrapper}>
                                <Text style={styles.goalItem}>{itemData.item.text}</Text>
                            </View>
                        )}
                    />
                </View>
    
                { /* ... * /}
        );
    }
    // ...

### Handling taps on elements

There is no generic `onClick` property on react native components (except buttons). To make an element tappable, it must be wrapped in a  `Pressable` components (others like `Touchable` exist but most are deprecated in favor of `Pressable`). `Pressable` can also wrap a `Text` element, which can be useful to apply a ripple effect on android:

    export default function GoalItem({ goal, onPress }: GoalItemProps) {
        return (
            <View style={styles.goalItemWrapper}>
                {/* could also be done with <Pressable onPress={onPress.bind(this, goal.id)}> */}
                <Pressable android_ripple={{ color: '#dddddd' }} onPress={() => onPress(goal.id)}>
                    <Text style={styles.goalItem}>{goal.text}</Text>
                </Pressable>
            </View>
        );
    }

On IOS, android_ripple has no effect but we can pass a function to the `style` prop that adds certain styles when a `Pressable` is pressed (the effect is also applied on android in addition to the ripple effect):

    ...
    <Pressable
        android_ripple={{ color: '#dddddd' }}
        style={({ pressed }) => pressed && styles.pressedItem}
        onPress={() => onPress(goal.id)}
    >
    ...

### Modals / Buttons

- RN has a `Modal` component included with `visible` and `animationType` props as the most important ones
- `Buttons` don't support `style` props but `color`. Custom buttons can be styles with `Pressable` and styled views inside of it
- Images should go into their own directory in the "assets" folder

### Images / colors

- Use the `Image` component with a `source` prop  to display images
- React native doesn't support svgs out of the box; more [here](https://blog.logrocket.com/how-to-use-svgs-react-native-tutorial-with-examples/)
- The image asset can't be imported but must be included with `require`
- Images support `style`


    <Image style={styles.goalImg} source={require('../assets/images/goal.png')} />

- A global (or OS-specific) app background color can be defined in `app.json`
- If the statusbar text / icons clash with the background color, we can set a style (a string!) for it using the StatusBar component (`import { StatusBar } from 'expo-status-bar';`):


    ...
    return (
        <>
            <StatusBar style={'light'} />
            <View style={styles.appContainer}>
    ...

## Debugging introduction

- console.logs and stacktraces are logged in the console where `npm start android` is running
- pressing `m` in the console opens a menu in the emulator with, among others, debugging options
- react devtools can be installed globally as a standalone version: `sudo npm install -g react-devtools` and ran with `react-devtools` while the `npm start android` is running, which opens a new standalone devtools window
- more here: https://reactnative.dev/docs/debugging

## Diving deeper into components, layouts, styling

## Sidenotes

- removing a pending snapshot if emulator was killed: `sudo rm ~/.android/avd/<your-device-name>.avd/*.lock` https://stackoverflow.com/questions/50055863/emulator-error-a-snapshot-operation-for-nexus-4-api-27-is-pending-and-timeou
- factory-reset the emulator in android studio->tools->device manager->arrow down icon beside the avd
- [Adding Eslint and Prettier to a react native project](https://dev-yakuza.posstree.com/en/react-native/eslint-prettier-husky-lint-staged/)
  - remove "rules" from eslint for tabs etc. as it's just annoying and is fixed by prettier anyway
  - enable eslint / prettier in IntelliJ
  - add `globals: { module: true }` to `.eslintrc.js` to get rid of module error shown there
