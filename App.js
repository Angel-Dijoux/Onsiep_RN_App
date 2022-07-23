
import AppNav from "./navigation/AppNav";
import { AuthProvider } from "./src/context/AuthContext";
import { OnisepProvider } from "./src/context/OnisepContext";

const App = () => {
  return(
    <OnisepProvider>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </OnisepProvider>
  );
} 

export default App