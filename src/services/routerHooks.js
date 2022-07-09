import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

export const withParams = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};
