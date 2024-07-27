import a17_0x19e151 from "ws";
import {
  createDelCatReq,
  createGatherGoldReq,
  createGetAirDropCatReq,
  createHeartBeatReq,
  createMergeCatReq,
  decodeMessage,
  getDuplicateLvl,
  getSmallestCatsLvl,
} from "./helper.js";
import { formatNumber, getOrdinalSuffix } from "../utils/helper.js";
import a17_0x3bf361 from "chalk";
export class WebSocketClient {
  constructor(_0x55c51e) {
    Object.defineProperty(this, "url", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });
    Object.defineProperty(this, "credentials", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });
    Object.defineProperty(this, "reconnectInterval", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });
    Object.defineProperty(this, "maxReconnectAttempts", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });
    Object.defineProperty(this, "reconnectAttempts", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });
    Object.defineProperty(this, "websocketOption", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });
    Object.defineProperty(this, "transId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1,
    });
    Object.defineProperty(this, "ws", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });
    Object.defineProperty(this, "logCallback", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });
    Object.defineProperty(this, "eventCallback", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined,
    });
    Object.defineProperty(this, "isConnected", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false,
    });
    Object.defineProperty(this, "user", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: null,
    });
    Object.defineProperty(this, "connect", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => {
        this.ws = new a17_0x19e151(this.url, this.websocketOption);
        this.ws.on("open", () => {
          const _0x3f8dbb = Buffer.from(this.credentials, "hex");
          this.send(_0x3f8dbb);
          this.reconnectAttempts = 0;
          this.setOnEvents({
            event: "open",
          });
        });
        this.ws.on("message", (_0x1ab76b) => {
          this.handleMessage(_0x1ab76b);
        });
        this.ws.on("close", () => {
          this.attemptReconnect();
          this.isConnected = false;
          this.setOnEvents({
            event: "close",
          });
        });
        this.ws.on("error", (_0x391aa5) => {
          this.setOnLogs(
            "" + a17_0x3bf361.redBright("WebSocket error: " + _0x391aa5)
          );
          this.isConnected = false;
          this.setOnEvents({
            event: "error",
          });
        });
      },
    });
    Object.defineProperty(this, "setOnLogs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (_0x5f12b0) => {
        if (this.logCallback) {
          this.logCallback(_0x5f12b0);
        }
      },
    });
    Object.defineProperty(this, "setOnEvents", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (_0xd34082) => {
        if (this.eventCallback) {
          this.eventCallback(_0xd34082);
        }
      },
    });
    Object.defineProperty(this, "handleMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: async (_0x2853c8) => {
        let _0x26c823;
        while (true) {
          try {
            _0x26c823 = await decodeMessage(_0x2853c8.toString("hex"));
            break;
          } catch (_0x5cc050) {}
        }
        const _0x54e70f = JSON.parse(_0x26c823);
        switch (_0x54e70f.protoName) {
          case "EnterGameAck":
            this.user = _0x54e70f.data.userInfo;
            this.runtimeHeartBeatReq();
            this.runtimeGatherGoldReq();
            this.runtimeGetAirDropCatReq();
            this.isConnected = true;
            this.checkMergerOrDeleteCats();
            this.setOnLogs(
              "" + a17_0x3bf361.greenBright("Connected to game server")
            );
            this.setOnEvents({
              event: "connect",
            });
            break;
          case "GatherGoldAck":
            if (this.user) {
              const _0x3f49b3 = formatNumber(
                parseInt(_0x54e70f.data.gold) - parseInt(this.user.gold)
              );
              this.user.gold = _0x54e70f.data.gold;
              this.user.goldTime = _0x54e70f.data.goldTime;
              this.setOnLogs(
                a17_0x3bf361.greenBright("Collected") +
                  " " +
                  a17_0x3bf361.whiteBright(_0x3f49b3) +
                  " " +
                  a17_0x3bf361.greenBright("Gold")
              );
              this.setOnEvents({
                event: "user",
              });
            }
            break;
          case "GetAirDropCatAck":
            if (this.user) {
              if (_0x54e70f.data.airdropIndex !== -1) {
                this.user.cats = _0x54e70f.data.cats;
                this.setOnEvents({
                  event: "user",
                });
                this.checkMergerOrDeleteCats();
                if (_0x54e70f.data.airdropIndex !== undefined) {
                  this.setOnLogs(
                    a17_0x3bf361.magentaBright("Got Airdrop Cat LVL") +
                      " " +
                      a17_0x3bf361.whiteBright(
                        _0x54e70f.data.cats[_0x54e70f.data.airdropIndex]
                      )
                  );
                }
              }
            }
            break;
          case "MergeCatAck":
            if (this.user) {
              this.user.cats = _0x54e70f.data.cats;
              this.checkMergerOrDeleteCats();
              this.setOnEvents({
                event: "user",
              });
            }
            break;
          case "DelCatAck":
            if (this.user) {
              this.user.cats = _0x54e70f.data.cats;
              this.setOnEvents({
                event: "user",
              });
            }
            break;
          case "HeartBeatAck":
            break;
          default:
        }
      },
    });
    Object.defineProperty(this, "attemptReconnect", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          setTimeout(() => {
            this.setOnLogs(
              a17_0x3bf361.yellowBright("Reconnecting...") +
                " " +
                a17_0x3bf361.blackBright(
                  "(" + (this.reconnectAttempts + 1) + ")"
                )
            );
            this.reconnectAttempts++;
            this.connect();
          }, this.reconnectInterval);
        } else {
          this.setOnLogs(
            "" + a17_0x3bf361.redBright("Max reconnect attempts reached")
          );
        }
      },
    });
    Object.defineProperty(this, "runtimeHeartBeatReq", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => {
        const _0x5ae2ec = async () => {
          if (this.user && this.isConnected) {
            try {
              this.transId++;
              const _0xca67e9 = await createHeartBeatReq(this.transId);
              const _0x307fee = Buffer.from(_0xca67e9, "hex");
              this.send(_0x307fee);
            } catch (_0xa19e6e) {}
          }
        };
        setInterval(_0x5ae2ec, 1000);
      },
    });
    Object.defineProperty(this, "runtimeGatherGoldReq", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => {
        const _0x3f4ea3 = async () => {
          if (this.user && this.isConnected) {
            try {
              this.transId++;
              const _0x2efe48 = await createGatherGoldReq(this.transId);
              const _0x12d0fa = Buffer.from(_0x2efe48, "hex");
              this.send(_0x12d0fa);
            } catch (_0x26d0f5) {}
          }
        };
        setInterval(_0x3f4ea3, 10000);
      },
    });
    Object.defineProperty(this, "runtimeGetAirDropCatReq", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => {
        const _0x1dce7f = async () => {
          if (this.user && this.isConnected) {
            try {
              this.transId++;
              const _0x33353f = await createGetAirDropCatReq(this.transId);
              const _0x49ea51 = Buffer.from(_0x33353f, "hex");
              this.send(_0x49ea51);
            } catch (_0x2194c6) {}
          }
        };
        setInterval(_0x1dce7f, 25000);
      },
    });
    Object.defineProperty(this, "checkMergerOrDeleteCats", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: async () => {
        if (this.user && this.isConnected) {
          const _0x4f3da2 = getDuplicateLvl(this.user.cats);
          if (_0x4f3da2.length > 0 && _0x4f3da2[0] !== undefined) {
            try {
              this.transId++;
              const _0x5def76 = await createMergeCatReq(
                this.transId,
                _0x4f3da2[0]
              );
              this.setOnLogs(
                a17_0x3bf361.greenBright("Mate The") +
                  " " +
                  a17_0x3bf361.whiteBright(
                    getOrdinalSuffix(_0x4f3da2[0][0] + 1)
                  ) +
                  " " +
                  a17_0x3bf361.greenBright("And") +
                  " " +
                  a17_0x3bf361.whiteBright(
                    getOrdinalSuffix(_0x4f3da2[0][1] + 1)
                  ) +
                  " " +
                  a17_0x3bf361.greenBright("Cats")
              );
              const _0x4c2274 = Buffer.from(_0x5def76, "hex");
              this.send(_0x4c2274);
            } catch (_0x142d07) {}
          } else if (
            this.user.cats.filter((_0x50b8ca) => _0x50b8ca === 0).length < 2
          ) {
            const _0x3e3f3d = getSmallestCatsLvl(this.user.cats);
            try {
              if (this.user.cats[_0x3e3f3d] !== 0) {
                this.transId++;
                const _0x23408b = await createDelCatReq(
                  this.transId,
                  _0x3e3f3d
                );
                this.setOnLogs(
                  a17_0x3bf361.redBright("Delete Cats LVL") +
                    " " +
                    a17_0x3bf361.whiteBright(this.user.cats[_0x3e3f3d])
                );
                const _0x26b59f = Buffer.from(_0x23408b, "hex");
                this.send(_0x26b59f);
              }
            } catch (_0x1eb8a2) {}
          }
        }
      },
    });
    Object.defineProperty(this, "onLogs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (_0x190b7d) => {
        this.logCallback = _0x190b7d;
      },
    });
    Object.defineProperty(this, "onEvents", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (_0x373b06) => {
        this.eventCallback = _0x373b06;
      },
    });
    Object.defineProperty(this, "send", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (_0x4083ed) => {
        if (this.ws && this.ws.readyState === a17_0x19e151.OPEN) {
          this.ws.send(_0x4083ed);
        }
      },
    });
    Object.defineProperty(this, "close", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => {
        if (this.ws) {
          this.ws.close();
        }
      },
    });
    this.url = _0x55c51e.url;
    this.credentials = _0x55c51e.credentials;
    this.reconnectInterval = _0x55c51e.reconnectInterval || 5000;
    this.maxReconnectAttempts = _0x55c51e.maxReconnectAttempts || 10;
    this.websocketOption = _0x55c51e.websocketOption || {};
    this.reconnectAttempts = 0;
    this.ws = null;
    this.connect();
  }
}
