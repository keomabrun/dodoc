const { notarize } = require("@electron/notarize");

exports.default = async function notarizing(context) {
  const appName = context.packager.appInfo.productFilename;
  const { electronPlatformName, appOutDir } = context;
  // We skip notarization if the process is not running on MacOS and
  // if the enviroment variable SKIP_NOTARIZE is set to `true`
  // This is useful for local testing where notarization is useless
  if (
    electronPlatformName !== "darwin" ||
    process.env.SKIP_NOTARIZE === "true"
  ) {
    console.log(`  • Skipping notarization`);
    return;
  }

  // THIS MUST BE THE SAME AS THE `appId` property
  // in your electron builder configuration
  const bundleId = "fr.l-atelier-des-chercheurs.dodoc";

  let appPath = `dist/mac-arm64/do•doc.app`;
  let { APPLE_ID, APPLE_APP_SPECIFIC_PASSWORD, APPLE_TEAM_ID } = process.env;
  console.log(`  • Notarizing ${appPath}`);

  return await notarize({
    tool: "notarytool",
    appBundleId: bundleId,
    appPath,
    appleId: APPLE_ID,
    appleIdPassword: APPLE_APP_SPECIFIC_PASSWORD,
    teamId: APPLE_TEAM_ID,
  });
};
