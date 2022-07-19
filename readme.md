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

To have multiple columns with `FlatList`, we have to use the `numColumns` prop instead of flexDirection / flexWrap.

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

If the item list is just a flat list of unique strings, just use `keyExtractor={(item: string)=>item}`

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

With rounded corners, a `overflow: 'hidden'` should be added to the surrounding container (here `goalItemWrapper`) so the ripple effect doesn't go past the rounded corners, but *NOT* for iOS as otherwise a possible shadow would be clipped as well.

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
- Images can also use URLs, it the requires an object as source: 
- For URL referenced images, width / height styles must be defined: `<Image source={{uri: 'http://blah.com/img.jpg'}}/>`

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
There is no `boxShadow` styling property but an `elevation` property with a similar effect (Android only); on iOS, there are shadow* properties (which only work if a backtgroundColor is set): 


      elevation: 8, // for android
      // below for iOS
      shadowOffset: {width: 8, height: 8},
      shadowColor: 'black',
      shadowRadius: 6,
      shadowOpacity: 0.25
      backgroundColor: 'white' // needed to have any effect on iOS

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

https://reactnavigation.org/docs/getting-started/

Wrap whole App in `NavigationContainer`.

React navigation provides different *navigators* like the [stack navigator](https://reactnavigation.org/docs/stack-navigator) that mimicks the browser's history api. 

The `native-stack` navigator uses native components and is more performant; if it gives problems, the `stack` navigator can be used instead. 

The Navigationcontainer automatically creates a wrapper around the "pages" and adds a title at the top.

    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    // ...
    const Stack = createNativeStackNavigator();
    // ... 
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="MealsCategories" component={Categories} />
            <Stack.Screen name="MealsOverview" component={MealsOverview} />
        </Stack.Navigator>
    </NavigationContainer>

The first screen defined in the list is used as the initial screen.


### The navigation prop

All components that are used in the `Screen` components automatically receive a navigation prop.

    function Categories({ navigation }: any) {
        // ...

The navigation props gives access to `navigate` which can be used to navigate to different screens using the name defined in the Screen navigation entry:

`navigation.navigate('MealsOverview');`

### Passing / acquiring the navigation prop in subcomponents 

The `navigation` prop can be forwarded to nested components via props or aquired with the `useNavigation` hook.

    import {useNavigation} from '@react-navigation/native';
    // ...
    function CategoryGridTile({ title, color, onPress }: CategoryGridTilePropsType) {
    const navigation = useNavigation(); 

### Passing props on navigation.navigate using route.params

On navigate, additional arbitrary parameters can be passed:

    navigation.navigate('MealsOverview', {
        categoryId: itemData.item.id,
    });

and extracted in the component (`MealsOverview`):

    // navigation and route props are automatically added
    export function MealsOverview({navigation, route}: any) {
        const {categoryId} = route.params;
        return (
            <View>
                <Text>Meals overview for {categoryId}</Text>
            </View>
        );
    }

Alternatively, the `useRoute` hook can be used.

### Screen display options

Options for title, colors etc. can be set in the Navigator or the individual screens: 

      <NavigationContainer>
          <Stack.Navigator screenOptions={{
              animation: 'fade_from_bottom',
              headerStyle: {
                  backgroundColor: '#351401'
              },
              headerTintColor: 'white',
              contentStyle: {backgroundColor: '#3f2f25'}
          }}>
              <Stack.Screen name="MealsCategories" component={Categories} options={{
                  title: 'Meal Categories'
              }}/>
              <Stack.Screen name="MealsOverview" component={MealsOverview}/>
          </Stack.Navigator>
      </NavigationContainer>

A function can be passed instead of an object:

      <Stack.Screen name="MealsOverview" component={MealsOverview} options={({route, navigation})=>{
          const catId = route.params.categoryId;
          return {title: catId};
      }}/>

The options can be also set inside the component:

As using `useEffect` only sets the title *after* rendering, it is better to use `useLayoutEffect`, which fires *before* paint (but is otherwise used the same way as `useEffect`.

    export function MealsOverview({navigation, route}: any) {
      const {categoryId, categoryName} = route.params;
  
      useLayoutEffect(() => {
          const categoryTitle = CATEGORIES.find(c => c.id === categoryId)!.title;
          navigation.setOptions({
              title: categoryTitle
          });
      }, [categoryId, navigation]);
      // ...

### Typescript props

https://reactnavigation.org/docs/typescript/

Gist:

Define a type `RootStackParamList` that defines the props for all routes, using the route names used in the root router as keys:

    export type RootStackParamList = {
        // screenName: {props}
        MealsOverview: {
            categoryId: string;
            categoryName: string
        };
        MealDetail: { id: number };
        MealsCategories: undefined; // no "custom" props beside route & navigation
    };

Then use these in the routes components:

    type Props = NativeStackScreenProps<RootStackParamList, 'MealsOverview'>;
    
    export function MealsOverview({navigation, route}: Props) {
        // typescript now knows that categoryId and categoryName exist on the route object
        const {categoryId, categoryName} = route.params;

Individual sub-components that are not route components are typed as usual as they don't automatically get `navigation` and `route` props but get their props as usual. If needed, the `navigation` can be passed like a normal prop or be acquired using `useNavigation` (don't forget to annotate):

    type MealItemPropsType = {
        id: string,
        title: string;
        imageUrl: string;
        duration: string;
        complexity: string;
        affordability: string;
    };
    
    function MealItem({id, title, imageUrl, complexity, duration, affordability}: MealItemPropsType) {
    
        const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
        function pressHandler(id: string) {
            navigation.navigate('MealDetail', {
                id: id,
            });
        }
        // ...

### Adding header buttons

Buttons can be added to the navigation header on each screen using the screen options:

    <Stack.Screen name="MealDetail" component={MealDetail} options={{
        headerRight: () => <Button title={"tap me"} onPress={()=>null} />
    }

Buttons defined there can't interact with the component / page they're displayed on, but they can also be added on the screen using `navigation.setOptions` using `useLayoutEffect` as before:

    function headerButtonPressHandler() {
        console.log("Pressed")
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button title={"tap me"} onPress={headerButtonPressHandler} />
        });
    }, [navigation, headerButtonPressHandler]);

### Other navigators

#### Drawer

https://reactnavigation.org/docs/drawer-navigator

reanimated bug: 
>Following the reanimated2 documentation , the problem is fixed adding the  react-native-reanimated/plugin   to babel.config.js  in root directory. After this, if the error persists, launch expo r -c for deploy the app with empty cache. This will probably fix the issue.

Adding a drawer navigator:

    const Drawer = createDrawerNavigator();

    return <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name={'WelcomeScreen'} component={WelcomeScreen}/>
            <Drawer.Screen name={'UserScreen'} component={UserScreen}/>
        </Drawer.Navigator>
    </NavigationContainer>;

This will make a burger menu appear at the top left beside the screen name.

Configuration example:

    const Drawer = createDrawerNavigator();

    return <NavigationContainer>
        <Drawer.Navigator screenOptions={{
            drawerActiveBackgroundColor: '#f0e1ff',
            drawerActiveTintColor: '#03c016b',
            drawerStyle: {backgroundColor: '#ccc'},
            headerStyle: {backgroundColor: '#3c016b'},
            headerTintColor: 'white',

        }}>
            <Drawer.Screen name={'WelcomeScreen'} component={WelcomeScreen}
                           options={{
                               drawerLabel: 'Welcome screen',
                               // color and focused are passed from the navigator based on if item is selected
                               drawerIcon: ({color, focused })=> <Ionicons name={"home"} color={color} size={18}/>
                           }}/>
            <Drawer.Screen name={'UserScreen'} component={UserScreen}
                           options={{
                               drawerLabel: 'User screen',
                               // color and focused are passed from the navigator based on if item is selected
                               drawerIcon: ({color, size})=> <Ionicons name={"person"} color={color} size={size}/>
                           }}/>
        </Drawer.Navigator>
    </NavigationContainer>;

The drawer can also be toggled using `navigation.toggleDrawer`:

    function UserScreen({route, navigation}) {
        return (
            <View style={styles.rootContainer}>
                <Text>
                    This is the <Text style={styles.highlight}>"User"</Text> screen!
                </Text>
                <Button onPress={navigation.toggleDrawer} title={"open menu"}/>
            </View>
        );
    }


#### Bottom Tabs

    import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
    
    export default function App() {
        const BottomTab = createBottomTabNavigator();
    
        return <NavigationContainer>
            <BottomTab.Navigator screenOptions={{
                headerStyle: {backgroundColor: '#3c0a6b'},
                headerTintColor: 'white',
                tabBarActiveTintColor: '#3c0a6b'
            }
            }>
            <BottomTab.Screen name={'WelcomeScreen'} component={WelcomeScreen}
                              options={{
                                  tabBarIcon: ({color, size}) => <Ionicons name={"home"} color={color} size={size}/>
                              }}/>
            <BottomTab.Screen name={'UserScreen'} component={UserScreen}
                              options={{
                                  tabBarIcon: ({color, size}) => <Ionicons name={"person"} color={color} size={size}/>
                              }}/>
    
        </BottomTab.Navigator>
    </NavigationContainer>

### Nesting navigators

As each navigator brings its own header, headers can be remove on individual screens using `headerShown: false` in the options prop of the `*.Screen` entry in App.tsx.

See MealsApp for an example of mixing Drawer and Stack navigators.

## Context / Redux

### Context
  
FavoriteContextProvider.tsx:

    import React, {useState} from 'react';
    import {createContext} from "react";
    
    type contextType = {
        ids: string[],
        addFavorite: (id: string) => void,
        removeFavorite: (id: string) => void,
    }
    export const FavoritesContext = createContext<contextType>({
        ids: [],
        addFavorite: (id: string) => null,
        removeFavorite: (id: string) => null,
    });
    
    function FavoritesContextProvider({children}: { children: React.ReactChildren | React.ReactChild }) {
        const [favoriteMealIds, setFavoriteMealIds] = useState<string[]>([]);
    
        function addFavorite(id: string) {
            setFavoriteMealIds(oldState => [...oldState, id])
        }
    
        function removeFavorite(id: string) {
            setFavoriteMealIds(oldState => oldState.filter(val => val !== id))
        }
    
        const value = {ids: favoriteMealIds, addFavorite: addFavorite, removeFavorite: removeFavorite};
    
        return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
    }
    
    export default FavoritesContextProvider;


App.tsx:

    <FavoritesContextProvider>
     //router, main app
    </FavoritesContextProvider>

Wherever the context is needed (e.g. MealDetail.tsx):

    const {ids, removeFavorite, addFavorite} = useContext(FavoritesContext);

    function headerButtonPressHandler() {
        if (favoriteMealIds.includes(id)) {
            removeFavorite(id);
            return;
        }
        addFavorite(id);
    }


### Redux (toolkit)

favoritesSlice.ts

    import {createSlice} from "@reduxjs/toolkit";
    
    export type favoritesSliceStateType = {
        ids: string[]
    }
    
    const initialState: favoritesSliceStateType = {
        ids: []
    }
    
    const favoritesSlice = createSlice({
        name: 'favorites',
        initialState: initialState,
        reducers: {
            addFavorite: (state, action) => {
                // we can use state as if we mutate it directly - the passed
                // "state" argument is a draft that is used to update the
                // "real" state under the hood
                state.ids.push(action.payload.id);
            },
            removeFavorite: (state, action) => {
                state.ids.splice(state.ids.indexOf(action.payload.id), 1);
            },
        }
    });
    
    // we don't export the slice itself but its components that are generated
    // by redux toolkit and added to the object
    export const {addFavorite, removeFavorite} = favoritesSlice.actions;
    export default favoritesSlice.reducer;

store.ts

    import {configureStore} from "@reduxjs/toolkit";
    import favoritesReducer from './favoritesSlice'
    const store = configureStore({
        reducer: {
            favorites: favoritesReducer
        }
    });
    
    // Infer the `RootState` and `AppDispatch` types from the store itself
    export type RootState = ReturnType<typeof store.getState>
    // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
    export type AppDispatch = typeof store.dispatch
    
    export default store;


App.tsx:

    import {Provider} from "react-redux";
    import store from "./store/redux/store";
    ...
    <Provider store={store}>
    routes, main app etc.
    </Provider>
    ...

Wherever the store and its methods are needed (e.g. MealDetail.tsx):

    import {useDispatch, useSelector} from "react-redux";
    import {RootState} from "../store/redux/store";
    import {addFavorite, removeFavorite} from "../store/redux/favoritesSlice";
    ...

    const favoriteMealIds = useSelector( (state: RootState) => state.favorites.ids )
    const dispatch = useDispatch();

    function headerButtonPressHandler() {
        if (favoriteMealIds.includes(id)) {
            // NOT just removeFavorite(id) - what we pass is the action.payload object,
            // which has an "id" property!
            dispatch(removeFavorite({id: id}));
            return;
        }
        dispatch(addFavorite({id: id}));
    }

## Sidenotes

- removing a pending snapshot if emulator was killed: `sudo rm ~/.android/avd/<your-device-name>.avd/*.lock` https://stackoverflow.com/questions/50055863/emulator-error-a-snapshot-operation-for-nexus-4-api-27-is-pending-and-timeou
- factory-reset the emulator in android studio->tools->device manager->arrow down icon beside the avd
- [Adding Eslint and Prettier to a react native project](https://dev-yakuza.posstree.com/en/react-native/eslint-prettier-husky-lint-staged/)
  - remove "rules" from eslint for tabs etc. as it's just annoying and is fixed by prettier anyway
  - enable eslint / prettier in IntelliJ
  - add `globals: { module: true }` to `.eslintrc.js` to get rid of module error shown there
- To have multiple columns with `FlatList`, we have to use the `numColumns` prop instead of flexDirection / flexWrap 
