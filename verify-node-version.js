#!/usr/bin/env node

const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

// Get the next command from process arguments
const nextCommand = process.argv.slice(2).join(" ") || "the next command";

// Console colors
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getPackageJsonNodeVersion() {
  try {
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    return packageJson.engines?.node;
  } catch (error) {
    log("❌ Error reading package.json", "red");
    process.exit(1);
  }
}

function getCurrentNodeVersion() {
  try {
    return execSync("node --version", { encoding: "utf8" }).trim();
  } catch (error) {
    log("❌ Error getting current Node version", "red");
    process.exit(1);
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
    log("⚠️  No Node version specified in package.json", "yellow");
    return true;
  }

  log(`\n${colors.bold}🔍 Checking Node.js version...${colors.reset}`);
  log(`📋 Required version: ${requiredVersion}`, "blue");
  log(`💻 Current version: ${currentVersion}`, "blue");

  // Extract required major version (e.g., "22.x" -> 22)
  const requiredMajor = parseInt(requiredVersion.replace(/[^0-9]/g, ""));
  const currentMajor = parseVersion(currentVersion);

  if (currentMajor === requiredMajor) {
    log(
      `✅ Perfect! You're using Node ${currentVersion} which matches the required version.`,
      "green"
    );
    return true;
  } else {
    log(
      `\n❌ ${colors.bold}INCOMPATIBLE NODE.JS VERSION DETECTED${colors.reset}`,
      "red"
    );
    log(`   Required: Node ${requiredVersion}`, "red");
    log(`   Current:  ${currentVersion}`, "red");
    log(`\n⚠️  ${colors.bold}Why this matters:${colors.reset}`, "yellow");
    log(
      `   • Using an incompatible Node version will cause the build to fail`,
      "yellow"
    );
    log(`   • This wastes time waiting for an inevitable failure`, "yellow");
    log(
      `   • Different Node versions may have breaking changes or missing features`,
      "yellow"
    );
    log(`\n💡 ${colors.bold}Quick solutions:${colors.reset}`, "yellow");
    log(
      `   1. Install if missing: ${colors.blue}nvm install ${requiredMajor}${colors.reset}`,
      "yellow"
    );
    log(
      `   2. Switch version: ${colors.blue}nvm use ${requiredMajor}${colors.reset}`,
      "yellow"
    );
    log(
      `   3. Set as default: ${colors.blue}nvm alias default ${requiredMajor}${colors.reset}`,
      "yellow"
    );
    log(
      `\n🚫 ${colors.bold}Build process cancelled to save your time and prevent compatibility issues.${colors.reset}`,
      "red"
    );
    log(
      `   ${colors.bold}Fix the Node version above and try again.${colors.reset}`,
      "red"
    );
    return false;
  }
}

// Ejecutar verificación
if (!checkNodeVersion()) {
  process.exit(1);
}

log(`\n🚀 We're good to go! proceeding with ${nextCommand}...\n`, "green");
