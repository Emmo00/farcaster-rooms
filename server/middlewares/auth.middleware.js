const {
  createClient: createFarcasterClient,
} = require("@farcaster/quick-auth");
const config = require("../config");

const farcasterClient = createFarcasterClient();

async function resolveUser(fid) {
  const primaryAddress = await (async () => {
    const res = await fetch(
      `https://api.farcaster.xyz/fc/primary-address?fid=${fid}&protocol=ethereum`
    );
    if (res.ok) {
      const { result } = await res.json();

      return result.address.address;
    }
  })();

  return {
    fid,
    primaryAddress,
  };
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Auth Token is missing" });
  }

  const payload = farcasterClient.verifyJwt({
    token,
    domain: `${config.https.listenIp}:${config.https.listenPort}`,
  });

  const user = resolveUser(payload.sub);

  console.log("authenticated user", user);

  req.user = user;
  next();
}

module.exports = {
  authMiddleware,
};
