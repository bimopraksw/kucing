import a24_0xcf553f from "chalk";
import {
  createSessionDirectory,
  getAllFilesFromFolder,
  getSessionDirectory,
  getUserFromUrl,
  readJsonFile,
  runtimeServer,
  updateBanner,
  writeToFile,
} from "./app/utils/helper.js";
import { DIR_PATH_SESSION } from "./app/utils/konst.js";
import a24_0x452f1e from "./app/form.js";
import a24_0x53f3e5 from "./app/deleteAccount.js";
import a24_0x26ec1d from "./app/mainMenu.js";
import a24_0x306ab9 from "./app/startBot.js";
import a24_0x213a57 from "./app/libs/catizen.js";
createSessionDirectory(DIR_PATH_SESSION);
(async () => {
  let _0x43ca91 = await runtimeServer();
  if (_0x43ca91.status === "exit") {
    process.stdout.write(updateBanner(_0x43ca91.baner));
    process.exit();
  }
  let _0x235a2 = 0;
  while (_0x43ca91.status === "reconnecting") {
    _0x235a2++;
    process.stdout.write("c");
    process.stdout.write(updateBanner(_0x43ca91.baner));
    console.log(
      a24_0xcf553f.yellowBright("Reconnecting ") +
        a24_0xcf553f.whiteBright("•".repeat(_0x235a2))
    );
    if (_0x235a2 > 4) {
      _0x235a2 = 0;
    }
    _0x43ca91 = await runtimeServer();
    await new Promise((_0x324b72) => setTimeout(_0x324b72, 5000));
  }
  process.stdout.write("c");
  process.stdout.write(updateBanner(_0x43ca91.baner));
  process.stdout.write("c");
  while (true) {
    const _0x3b3b29 = await a24_0x26ec1d(_0x43ca91.baner);
    if (_0x3b3b29 === "exit") {
      process.exit();
    }
    if (_0x3b3b29 === "1") {
      var _0x240e61 = getAllFilesFromFolder(DIR_PATH_SESSION);
      let _0x4a4952 = [];
      for (let _0x4c0a91 = 0; _0x4c0a91 < _0x240e61.length; _0x4c0a91++) {
        let _0x18422b = _0x240e61[_0x4c0a91];
        if (_0x18422b) {
          var _0x54a777 = readJsonFile(_0x18422b);
          _0x4a4952.push(_0x54a777);
        }
      }
      if (_0x240e61.length < 1) {
        await a24_0x452f1e(
          a24_0xcf553f.yellowBright(
            "Account is empty, please add account before start bot"
          ) +
            "\n" +
            a24_0xcf553f.blackBright("Press Enter To Back"),
          _0x43ca91.baner
        );
      } else {
        const _0x542331 = await a24_0x306ab9(_0x4a4952, _0x43ca91.baner);
        if (_0x542331 === "exit") {
          process.exit();
        }
      }
    }
    if (_0x3b3b29 === "2") {
      const _0xd8d798 = await a24_0x452f1e(
        "Enter your init_data",
        _0x43ca91.baner
      );
      let _0xc4dcd4;
      try {
        _0xc4dcd4 = getUserFromUrl(_0xd8d798);
      } catch (_0x1658c1) {
        await a24_0x452f1e(
          a24_0xcf553f.yellowBright(
            "WTF with your input, Check your input moron!"
          ) +
            "\n" +
            a24_0xcf553f.blackBright("Press Enter To Back"),
          _0x43ca91.baner
        );
        continue;
      }
      let _0xc624dc = {
        use_proxy: false,
        proxy_hostname: "",
        proxy_protocol: "socks5",
        proxy_port: 0,
        proxy_username: "",
        proxy_password: "",
      };
      const _0x47ba10 = new a24_0x213a57({
        token: "",
        initData: _0xd8d798,
      });
      const _0x4e9b43 = await _0x47ba10.login();
      if ("code" in _0x4e9b43) {
        if (_0x4e9b43.code === 106) {
          await a24_0x452f1e(
            a24_0xcf553f.redBright("Catizen on Maintenance") +
              "\n" +
              a24_0xcf553f.blackBright("Press Enter To Back"),
            _0x43ca91.baner
          );
        }
        if (_0x4e9b43.code === 2) {
          await a24_0x452f1e(
            a24_0xcf553f.redBright(
              "Invalid Credentials, Please Recapture Credentials"
            ) +
              "\n" +
              a24_0xcf553f.blackBright("Press Enter To Back"),
            _0x43ca91.baner
          );
        }
      } else {
        try {
          writeToFile(
            getSessionDirectory(DIR_PATH_SESSION) +
              "/" +
              _0xc4dcd4.username +
              ".json",
            JSON.stringify({
              username: _0xc4dcd4.username,
              access_token: "",
              init_data: _0xd8d798,
              ..._0xc624dc,
            })
          );
          await a24_0x452f1e(
            a24_0xcf553f.greenBright("Success To Add Login") +
              "\n" +
              a24_0xcf553f.blackBright("Press Enter To Back"),
            _0x43ca91.baner
          );
        } catch (_0x5d6d9e) {
          await a24_0x452f1e(
            a24_0xcf553f.redBright("Something went wrong") +
              "\n" +
              a24_0xcf553f.blackBright("Press Enter To Back"),
            _0x43ca91.baner
          );
          continue;
        }
      }
    }
    if (_0x3b3b29 === "3") {
      try {
        var _0x240e61 = getAllFilesFromFolder(DIR_PATH_SESSION);
        let _0xe88b48 = [];
        for (let _0x32e378 = 0; _0x32e378 < _0x240e61.length; _0x32e378++) {
          let _0x1d0b8e = _0x240e61[_0x32e378];
          if (_0x1d0b8e) {
            var _0x54a777 = readJsonFile(_0x1d0b8e);
            _0xe88b48.push({
              name: _0x54a777.username,
              location: _0x1d0b8e,
            });
          }
        }
        if (_0xe88b48.length > 0) {
          const _0x40ea76 = await a24_0x53f3e5(_0xe88b48, _0x43ca91.baner);
          if (_0x40ea76 === "exit") {
            process.exit();
          }
        } else {
          await a24_0x452f1e(
            a24_0xcf553f.redBright("Account is empty") +
              "\n" +
              a24_0xcf553f.blackBright("Press Enter To Back"),
            _0x43ca91.baner
          );
          continue;
        }
      } catch (_0x367fc5) {
        await a24_0x452f1e(
          a24_0xcf553f.redBright("Something went wrong") +
            "\n" +
            a24_0xcf553f.blackBright("Press Enter To Back"),
          _0x43ca91.baner
        );
        continue;
      }
    }
  }
})();
