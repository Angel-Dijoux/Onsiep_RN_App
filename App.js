import AppNav from "./navigation/AppNav";
import { AuthProvider } from "./src/context/AuthContext";
import { FavorisProvider } from "./src/context/FavorisContext";
import { OnisepProvider } from "./src/context/OnisepContext";

const App = () => {
  return (
    <OnisepProvider>
      <AuthProvider>
        <FavorisProvider>
          <AppNav />
        </FavorisProvider>
      </AuthProvider>
    </OnisepProvider>
  );
};

export default App;
