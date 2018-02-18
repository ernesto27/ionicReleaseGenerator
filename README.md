# ionicReleaseGenerator
node script for create build, sign , and zip apk for production


Primero tienen que generar el keystore que se va a utilizar para firmar el apk . 

```
$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```


## Configuracion

Renombrar el archivo releaseSettings-example.js a releaseSettings y configurar los datos correspondientes

``` javascript
var settings = {
    keyStore: 'my-release-key.keystore',
    keyStorePassword: '123456',
    pathUnsignedApk: './platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk',
    aliasName: 'alias_name',
    signApkName: './apkReleases/version1.0.0.apk',
    pathZipalign: '~/Library/Android/sdk/build-tools/26.0.2/'
};

```

Ejecutar el siguiente comando en la terminal.

```shell
$ node signApk.js
```

El apk firmado se guarda en la carpeta apkRelease .
