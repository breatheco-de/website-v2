import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

/**
 * Wrapper component for ReCAPTCHA that handles the existence of GATSBY_CAPTCHA_KEY
 * Only renders ReCAPTCHA if the environment variable exists
 * Prevents the app from breaking in development when not configured
 */
const SafeReCAPTCHA = React.forwardRef((props, ref) => {
  // Check if the environment variable exists
  const captchaKey = process.env.GATSBY_CAPTCHA_KEY;

  // If key doesn't exist, don't render anything (development mode)
  if (!captchaKey) {
    console.warn(
      "GATSBY_CAPTCHA_KEY is not defined. ReCAPTCHA will not be rendered."
    );
    return null;
  }

  // If key exists, render ReCAPTCHA normally
  return <ReCAPTCHA ref={ref} sitekey={captchaKey} {...props} />;
});

SafeReCAPTCHA.displayName = "SafeReCAPTCHA";

export default SafeReCAPTCHA;
