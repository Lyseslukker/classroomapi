
// client -> login -> server:
// Generate: 
const tempObjectID = {
    // Http Only Cookie
    httpOnlyCookie: { scid: UUID, donkey: 5 },
    // Regular Cookie
    regCookie: { cid: UUID, octopus: 19 },
    // CSFR (Embed in site)
    csfr: { csfr: UUID, chimpanzee: 7 },
    // Session Storage
    sessionStorage: { ssid: UUID, dragonfly: 9 },
    // URL Params
    url: { suid: UUID, hippopotamus: 13 }
}