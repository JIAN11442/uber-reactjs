import { 
    useSafeAreaInsets, 
    SafeAreaInsetsContext 
} from "react-native-safe-area-context";

// class 组件
class ClassComponent extends React.Component {
    render() {
      return (
        <SafeAreaInsetsContext.Consumer>
          {(insets) => <View style={{ paddingTop: insets.top }} />}
        </SafeAreaInsetsContext.Consumer>
      );
    }
  }

  export default ClassComponent

