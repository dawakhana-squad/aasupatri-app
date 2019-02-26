import React from "react";
import { createStackNavigator, createAppContainer} from "react-navigation";
import { ThemeContext,getTheme, COLOR} from "react-native-material-ui";

// import ListingPage from "./pages/listing";
// import DetailsPage from "./pages/details";
import SplashPage from "./pages/Splash";
import FeedbackPage from "./pages/feedback";
import Register from './pages/Register';
import Landing from './pages/Landing';
const Asupathri = createStackNavigator({
  Home: {screen: SplashPage, navigationOptions: { header: null }},
  Register: {screen: Register, navigationOptions: { header: null }},
  Landing: {screen: Landing, navigationOptions: { header: null }},
//  ListingPage: {screen: ListingPage, navigationOptions: { header: null }},
  // DetailsPage: {screen: DetailsPage, navigationOptions: { header: null }},
//  FeedbackPage: {screen: FeedbackPage, navigationOptions: { header: null }}
},{
  header:{ visible:false }
});

// const uiTheme = {
//   palette: {
//       primaryColor: "#f5a623"
//   },
//   toolbar: {
//       container: {
//           height: 50,
//       },
//   },
// };
const uiTheme = {
  palette: {
    primaryColor: "#f5a623",
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

const AppContainer=createAppContainer(Asupathri);


export default class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <AppContainer/>
      </ThemeContext.Provider>
    );
  }
}

// export default createAppContainer(Asupathri);
