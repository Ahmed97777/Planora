import AuthHeader from "../_components/authComponents/AuthHeader";
import AuthFooter from "../_components/authComponents/AuthFooter";
import AuthForm from "../_components/authComponents/AuthForm/AuthForm";
import AuthContainer from "../_components/authComponents/AuthContainer";
import ToggleAuthMode from "../_components/authComponents/ToggleAuthMode";
// import SocialAuthButtons from "../_components/authComponents/SocialAuthButtons";

export default function AuthPage() {
  return (
    <AuthContainer>
      <AuthHeader />
      <AuthForm />
      {/* <SocialAuthButtons /> */}
      <ToggleAuthMode />
      <AuthFooter />
    </AuthContainer>
  );
}
