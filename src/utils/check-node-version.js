const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Import colors for console output
var colors = require("colors");

function fail(message) {
  console.log(message.red);
  process.exit(1);
}

function warn(message) {
  console.log(message.yellow);
}

function success(message) {
  console.log(message.green);
  process.exit(0);
}

function getPackageJsonNodeVersion() {
  try {
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    return packageJson.engines?.node;
  } catch (error) {
    fail("Error reading package.json: " + error.message);
  }
}

function getCurrentNodeVersion() {
  try {
    return execSync("node --version", { encoding: "utf8" }).trim();
  } catch (error) {
    fail("Error getting current Node version: " + error.message);
  }
}

function parseVersion(versionString) {
  // Remove 'v' prefix if exists and extract major version number
  const cleanVersion = versionString.replace(/^v/, "");
  const majorVersion = parseInt(cleanVersion.split(".")[0]);
  return majorVersion;
}

function checkNodeVersion() {
  const requiredVersion = getPackageJsonNodeVersion();
  const currentVersion = getCurrentNodeVersion();

  if (!requiredVersion) {
    warn("No Node version specified in package.json");
    return true;
  }

  console.log("🔍 Checking Node.js version...".blue);
  console.log(`📋 Required version: ${requiredVersion}`.blue);
  console.log(`💻 Current version: ${currentVersion}`.blue);

  // Extract required major version (e.g., "22.x" -> 22)
  const requiredMajor = parseInt(requiredVersion.replace(/[^0-9]/g, ""));
  const currentMajor = parseVersion(currentVersion);

  if (currentMajor === requiredMajor) {
    console.log(
      `✅ Perfect! You're using Node ${currentVersion} which matches the required version.`
        .green
    );
    return true;
  } else {
    fail(`INCOMPATIBLE NODE.JS VERSION DETECTED
Required: Node ${requiredVersion}
Current:  ${currentVersion}

Why this matters:
• Using an incompatible Node version will cause the build to fail
• This wastes time waiting for an inevitable failure
• Different Node versions may have breaking changes or missing features

Quick solutions:
1. Install if missing: nvm install ${requiredMajor}
2. Switch version: nvm use ${requiredMajor}
3. Set as default: nvm alias default ${requiredMajor}

Process cancelled to save your time and prevent compatibility issues.
Fix the Node version above and try again.`);
  }
}

// Execute verification
if (!checkNodeVersion()) {
  fail("Node version check failed");
}

success("Node.js version validation passed");
