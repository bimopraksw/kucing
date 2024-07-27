import a14_0x5ce6ac from "axios";
const BASE_URL = "https://catizen-free-server.vercel.app";
const createEnterGameReq = async (_0x3cd366, _0x260e33) => {
  const _0x253c6a = await a14_0x5ce6ac.post(
    BASE_URL + "/catizen-free/entergame",
    {
      ..._0x3cd366,
      transId: _0x260e33,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (_0x253c6a.data.status) {
    return _0x253c6a.data.result;
  }
  throw new Error(_0x253c6a.data.message);
};
const createHeartBeatReq = async (_0x165aaa) => {
  const _0x6f8731 = await a14_0x5ce6ac.post(
    BASE_URL + "/catizen-free/heartbeat",
    {
      transId: _0x165aaa,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (_0x6f8731.data.status) {
    return _0x6f8731.data.result;
  }
  throw new Error(_0x6f8731.data.message);
};
const createGatherGoldReq = async (_0x3a81c1) => {
  const _0x776999 = await a14_0x5ce6ac.post(
    BASE_URL + "/catizen-free/gathergoldreq",
    {
      transId: _0x3a81c1,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (_0x776999.data.status) {
    return _0x776999.data.result;
  }
  throw new Error(_0x776999.data.message);
};
const createMergeCatReq = async (_0x1625c2, _0x465515) => {
  const _0x14b8b3 = await a14_0x5ce6ac.post(
    BASE_URL + "/catizen-free/mergecatreq",
    {
      transId: _0x1625c2,
      catToMerge: _0x465515,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (_0x14b8b3.data.status) {
    return _0x14b8b3.data.result;
  }
  throw new Error(_0x14b8b3.data.message);
};
const createDelCatReq = async (_0x3e3dae, _0x15c970) => {
  const _0x37fb4d = await a14_0x5ce6ac.post(
    BASE_URL + "/catizen-free/delcatreq",
    {
      transId: _0x3e3dae,
      catToDelete: _0x15c970,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (_0x37fb4d.data.status) {
    return _0x37fb4d.data.result;
  }
  throw new Error(_0x37fb4d.data.message);
};
const createGetAirDropCatReq = async (_0x5e1227) => {
  const _0x531be3 = await a14_0x5ce6ac.post(
    BASE_URL + "/catizen-free/getairdropcatreq",
    {
      transId: _0x5e1227,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (_0x531be3.data.status) {
    return _0x531be3.data.result;
  }
  throw new Error(_0x531be3.data.message);
};
const decodeMessage = async (_0x400379) => {
  const _0x17167b = await a14_0x5ce6ac.post(
    BASE_URL + "/catizen-free/decode",
    {
      data: _0x400379,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (_0x17167b.data.status) {
    return JSON.stringify(_0x17167b.data.result);
  } else {
    throw new Error(_0x17167b.data.message);
  }
};
const getDuplicateLvl = (_0x54a207) => {
  let _0x4dba4f = [];
  for (let _0x35f42e = 0; _0x35f42e < _0x54a207.length; _0x35f42e++) {
    let _0x45241f = _0x54a207[_0x35f42e];
    if (_0x45241f === 0) {
      continue;
    }
    for (let _0x4660ff = 0; _0x4660ff < _0x54a207.length; _0x4660ff++) {
      let _0x4d10c9 = _0x54a207[_0x4660ff];
      if (
        _0x35f42e !== _0x4660ff &&
        _0x45241f === _0x4d10c9 &&
        _0x45241f !== 0
      ) {
        _0x4dba4f.push([_0x35f42e, _0x4660ff]);
      }
    }
  }
  return _0x4dba4f;
};
const getSmallestCatsLvl = (_0x3bbc3c) => {
  const _0x3f8029 = _0x3bbc3c.filter((_0x50f486) => _0x50f486 !== 0);
  const _0x3cb57e = Math.min(..._0x3f8029);
  return _0x3bbc3c.indexOf(_0x3cb57e);
};
export {
  createEnterGameReq,
  createHeartBeatReq,
  createGatherGoldReq,
  createMergeCatReq,
  createDelCatReq,
  createGetAirDropCatReq,
  decodeMessage,
  getDuplicateLvl,
  getSmallestCatsLvl,
};
