# React native the practical guide course follow-along

## Gist of creating a typscript expo project with good tooling:

    expo init projectname # or npx create-expo-app projectname
    cd projectname
    npm install --save-dev eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks prettier eslint-plugin-prettier

create the following files in project root with the following content:

`.eslintrc.js`

    module.exports = {
        "env": {
            "browser": true,
            "es2021": true
        },
        "extends": [
            "eslint:recommended",
            "plugin:react/recommended",
            "plugin:@typescript-eslint/recommended"
        ],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
            "ecmaFeatures": {
                "jsx": true
            },
            "ecmaVersion": "latest",
            "sourceType": "module"
        },
        "plugins": [
            "react",
            "@typescript-eslint"
        ],
        "rules": {
        }
    }

`.prettierrc.js`

    module.exports = {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
        tabWidth: 4,
    };

Run android emulator (change name of avd to the one created in android studio)

    ~/Android/Sdk/emulator/emulator -avd Pixel_2_API_30

Or put a function in `.bashrc`

    emulator () {
        ~/Android/Sdk/emulator/emulator -avd Pixel_2_API_30
    }

Start the app with `npm run android` (alternative scripts in package.json)

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

`<Text>` components can have `strings` and other `<Text>` components as children (others too?)

React native has a small set of [core components](https://reactnative.dev/docs/components-and-apis) that are the building blocks of an App, like html elements are the core components of `react-dom`.

There is no CSS, styles are written inline or as StyleSheet objects in javascript next to the component code. They react native styles are a subset of CSS.

**Styles don't cascade** - styles from parent elements like `color` aren't inherited by child elements except for `<Text>` components insider other `<Text>` components.

Styles in general can be passed as an object or as an *array* of objects and are evaluated from left to right (so the rightmost styles overwrite the previous ones).

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

On IOS, android_ripple has no effect, but we can pass a function to the `style` prop that adds certain styles when a `Pressable` is pressed (the effect is also applied on android in addition to the ripple effect):

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

### Shadow
There is no `boxShadow` styling property but an `elevation` property with a similar effect (Android only); on iOS, there are shadow* properties: 


      elevation: 8, // for android
      // below for iOS
      shadowOffset: {width: 8, height: 8},
      shadowColor: 'black',
      shadowRadius: 6,
      shadowOpacity: 0.25

### Pressable styles

    <Pressable
          style={({ pressed }) =>
              pressed ? [styles.pressed, styles.innerContainer] : styles.innerContainer
          }
          onPress={onPress}
          android_ripple={{ color: '#2c041a' }}
      >

### Backgrounds

Gradients can be applied using [expo LinearGradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/):

    <LinearGradient colors={['#4e0239', '#ddb52f']} style={styles.container}>...</LinearGradient>

### Different styles for android and iOS

### Alerts

React native exposes an `Alert` component that can be used to display alerts or for confirmations (ok/cancel) like in the browser:

    import { Alert } from 'react-native'; 
    ...
    Alert.alert('Please enter a number', 'The number must be between 0 and 99!', [
                { text: 'OK', style: 'destructive', onPress: () => setEnteredNumber('') },
            ]);
  
### Respecting device screen restrictions with SafeAreaView

To avoid cameras etc. that reach into the screen, we can use `SafeAreaView`, which detects the device model and it's specific features that might hide some part of the screen.

    <LinearGradient colors={['#4e0239', '#ddb52f']} style={styles.container}>
        <ImageBackground .../>
        <StatusBar style="auto" />
        <SafeAreaView style={{flex: 1}}>
            {enteredNumber ? (
                <GameScreen number={enteredNumber} />
            ) : (
                <StartGameScreen setNumber={setNumber} />
            )}
        </SafeAreaView>
    </LinearGradient>

### Adding icons

Expo provides a huge set of vector icon sets through `@expo/vector-icons/`

[Documentation](https://docs.expo.dev/guides/icons/)
[icon directory](https://icons.expo.fyi/)

[Currently there's an issue with typescript with these icons](https://github.com/expo/vector-icons/issues/225)

Ugly workaround for now:

    <PrimaryButton onPress={game.bind(this, 'lower')}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <AntDesign name="minuscircleo" size={24} color={'white'} />
    </PrimaryButton>

### Adding custom fonts and Loading screen

Custom fonts can be used by installing `expo install expo-font`, then add `import { useFonts } from 'expo-font';` to the main App component.

https://docs.expo.dev/guides/using-custom-fonts/

    const [fontsLoaded] = useFonts({
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    });

When loaded in the App component, these are then available with their respective names in all other components to use in the style objects:

    titleText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'open-sans-bold'
    },

A default loading screen can be installed using `expo install expo-app-loading` which then provides an `AppLoading` component.

    if (!fontsLoaded) {
      return <AppLoading />;
    }

## Building adaptive user interfaces

### Dynamic widths

- use min- / maxWidth / -Height with a percentage to limit width of items on smaller screens

### Dimensions API

`Dimensions` (imported from `react-native`) is a Javascript object (not a JSX component) to get the device width / height.

    const deviceWidth = Dimensions.get('window').width;
    // in styles:
    padding: deviceWidth < 380 ? 12 : 32,

### Screen orientation

The default device orientation for the app is set in `app.json` under `expo`.

Values: `default` (can switch orientation / not locked), `landscape` and `portrait`

The Dimensions object is only created once if defined outside a component, so the values don't change when switching screen orientation.

React native provide a useWindowDimenstions for this which watches the device' orientation:

    ...
    const { width, height } = useWindowDimensions();
    const marginTopDistance = height < 380 ? 16 : 64;

    return (
        <View style={[styles.container, {marginTop: marginTopDistance}]}>
    ...


### KeyboardAvoidingView

        <ScrollView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={'position'}>
                <View style={[styles.container, { marginTop: marginTopDistance }]}>


### Writing Platform-specific code with the Platform API

Can be used simply like `borderWidth: Platform.OS === 'ios' ? 2 : 5` or with `Platform.select`:

    borderColor: Platform.select({
        ios: '#FFFFFF',
        android: '#cccccc',
    }),

### Loading platform specific components

By simply naming files `Componentname.platform.tsx`, e.g. `Title.ios.tsx` and `Title.android.tsx` react native will automatically pick the correct OS-specific component when importing with `import Title from './Title'`. The same goes for all  (not just react components) such as e.g. `colors.ios.ts`.

### Styling the status bar

Gives different options like dark, light, auto and inverted and can be used in the main app.ts or in single components / screens if necessary. Position in the tsx doesn't seem to matter.

    <StatusBar style="inverted" />

## Navigation  / Meals app


# # Sidenotes

- removing a pending snapshot if emulator was killed: `sudo rm ~/.android/avd/<your-device-name>.avd/*.lock` https://stackoverflow.com/questions/50055863/emulator-error-a-snapshot-operation-for-nexus-4-api-27-is-pending-and-timeou
- factory-reset the emulator in android studio->tools->device manager->arrow down icon beside the avd
- [Adding Eslint and Prettier to a react native project](https://dev-yakuza.posstree.com/en/react-native/eslint-prettier-husky-lint-staged/)
  - remove "rules" from eslint for tabs etc. as it's just annoying and is fixed by prettier anyway
  - enable eslint / prettier in IntelliJ
  - add `globals: { module: true }` to `.eslintrc.js` to get rid of module error shown there
