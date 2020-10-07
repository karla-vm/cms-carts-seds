import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { secureLoadUserThenSections } from "../../actions/initial";

const SecureInitialDataLoad = () => {
  const { authState, authService } = useOktaAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // show logged-out page here?
    } else {
      authService.getUser().then((info) => {
        dispatch(
          secureLoadUserThenSections({ userData: info, authState })
        );
      });
    }
  }, [authState, authService]); 

  return null;
};

export default SecureInitialDataLoad;
