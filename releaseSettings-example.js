var settings = {
    keyStore: 'my-release-key.keystore',
    keyStorePassword: '123456',
    pathUnsignedApk: './platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk',
    aliasName: 'alias_name',
    signApkName: './apkReleases/version1.0.0.apk',
    pathZipalign: '~/Library/Android/sdk/build-tools/26.0.2/'
};

module.exports = settings;