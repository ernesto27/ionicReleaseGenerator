const { exec } = require('child_process');
const fs = require('fs');
const releaseSettings = require('./releaseSettings');

const keyStore = releaseSettings.keyStore;
const pathUnsignedApk = releaseSettings.pathUnsignedApk;
const keyStorePassword = releaseSettings.keyStorePassword;
const aliasName = releaseSettings.aliasName;
const signApkName = releaseSettings.signApkName;
const pathZipalign = releaseSettings.pathZipalign;


if(fs.existsSync(signApkName)){
    console.log('Ya existe un apk con el nombre ' + signApkName);
    process.exit(1);
}


function buildRelease(){
    var build = exec('ionic cordova build --release android', (error, out, code) => {
        if(error){
            console.log(error);
            process.exit(1);
        }

        firmApk();
    });

    build.stdout.on('data', (chunk) => {
        console.log(chunk);
    });
}


function firmApk(){
    var sign = exec('jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1' + 
                    ' -keystore ' + keyStore + 
                    ' --storepass ' + keyStorePassword + ' ' + 
                    pathUnsignedApk + 
                    ' ' + aliasName, (error, out, code) => {

                        if(error){
                            console.log(error);
                            process.exit(1);
                        }
                        
                        zipApk();
                    });

    sign.stdout.on('data', (chunk) => {
        console.log(chunk);
    });
}


function zipApk(){
    var zipApk = exec(pathZipalign + 'zipalign -v 4 ' +
                    pathUnsignedApk  + 
                    ' ' + signApkName, (error, out , code) => {
                        if(error){
                            console.log(error);
                            process.exit(1);
                        }

                        console.log('APK ' + signApkName + ' created!');
                    });

    zipApk.stdout.on('data', (chunk) => {
        console.log(chunk);
    });
}

// Init build
buildRelease();

