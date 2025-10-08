import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

/**
 * Wrapper component for ReCAPTCHA that handles SSR and environment variable checks
 * Only renders ReCAPTCHA on client-side after mount if the environment variable exists
 * Prevents SSR evaluation and build-time null rendering issues
 */
const SafeReCAPTCHA = React.forwardRef((props, ref) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  // Only render on client-side after mount
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // During SSR, return null (expected behavior)
  if (typeof window === "undefined") {
    return null;
  }

  // On client, wait for mount
  if (!isMounted) {
    return null;
  }

  const captchaKey = process.env.GATSBY_CAPTCHA_KEY;

  if (!captchaKey) {
    if (!hasError) {
      console.warn(
        "GATSBY_CAPTCHA_KEY is not defined. ReCAPTCHA will not be rendered."
      );
      setHasError(true);
    }
    return null;
  }

  return <ReCAPTCHA ref={ref} sitekey={captchaKey} {...props} />;
});

SafeReCAPTCHA.displayName = "SafeReCAPTCHA";

export default SafeReCAPTCHA;
