import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {SDK} from 'casdoor-nodejs-sdk';

const cert = `-----BEGIN CERTIFICATE-----
MIIE3TCCAsWgAwIBAgIDAeJAMA0GCSqGSIb3DQEBCwUAMCgxDjAMBgNVBAoTBWFk
bWluMRYwFAYDVQQDEw1jZXJ0LWJ1aWx0LWluMB4XDTIzMDYyOTA4MTA0MVoXDTQz
MDYyOTA4MTA0MVowKDEOMAwGA1UEChMFYWRtaW4xFjAUBgNVBAMTDWNlcnQtYnVp
bHQtaW4wggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQCkQ2ePRzB4e9cr
G+KUK1vhlv/k+IdQ6BejiPvQsewcxxNRKQ2fWYMEUdKlPm3JAUbkOV1+TtBr5pt9
65MMOWVyU8PljJhybaR/PHKmIStnXlEr5lzKmPopMZsHOQPIJsRKB32onsFIPSFZ
u+39vMkk8YgDrRnT2LUIY7BwADykgXMw6G4YcXK/yn+u9vpgXJwiBmK+35awzuW7
/VnPlcBGzFO6G3pnFp7EhAMxFfQyvYzunZuTkjrQn5i8heEBwym1xGauwWZeDKPX
vTcAkOr8zp0VT4SXQKUZCaC8ysrl10H0gPkoLkx+wZjcxTbTirrur7cJjLvYsv8Z
pX3dAoral3mH0vMWHXHwo+S8VrkKckGt9XV66Y70PbB7lAjtwB07LPBLpRtap+S0
O72fYaY+E4dEmYINto5b4kIXv7T43aAUvgbMEtii9On8QT1NcyVRBXuHqoW2zaqn
K98QGso2bUy8XZnWgqM7s/w+t10xk1kM9GQExw2cdvf4coc5EGgtyKmkKq+26ElR
qaP5sUe/z/cCvfzqw+xPgb4vRDpKWh5AM38fBMEsDNAJuiUIBhf1aW2vYtXeNxKq
G2mfWK6xZl3AO3GCqpJZPE0y2wYpCnnmvQ0Xo9ghUZsNP1uHaYmHJgOHZLgpq++L
Ysxtu3PbWwA9b318Y3qhEp97cdtbIwIDAQABoxAwDjAMBgNVHRMBAf8EAjAAMA0G
CSqGSIb3DQEBCwUAA4ICAQCC/PKzwCE+G1A1rfPMwVwLYz1NqSvbHoWg8Y8iBGqW
ubaeUcrIO416/DrbbLH9iFot22IGCUtFfxvW1d7VyISFU/Tffp9icQ13KydPgA8z
AbtdQExkFVushEHC3xZtN6SodCIqPwHn1y1JLIrM/Kj3kE5oqMTyHfM6JyVNV1s7
0MLbeDdf/ErJL+3tejf4kVPyWGJIJnnCM44x3+r3ma5cTlM1TbsIKUAZH6hLEO7T
RVDl5iTPFIFC8gjBmadNmEg9IYjx4K8d4QfpK9f+x4zaOag/eMplbIXXze+ZwnZK
QzG5L8/Qanufw930fFNTrYH+K7UjMqTZctSl7cArItm1ZacPw1NOmzTeZQIwRwF0
sVlMn33jsVgWgEtUn5RcFbIdn4yN88QLKx1m4RQWL6aDrXaHtF/10dy6UM72d5Zi
xoX5Hc8ssHnntTMuW5EvE5RQp/XGZ3x5hFhNaW/za32b9+tZk6JSONRnhanW+ATS
SaEzRNg8iN4E7CE8uSuD0FaeWmcjwXuQsLprhOXcLcEaH9z2tqiZtqQ2uSPEvfJ5
Ixf0swVrFtwCkvprKgaoRCfQnh1GK0vsSvfno4cN8yS52xZu3lMzq87iGG35rgGd
9W6cR6uehPPW0oeIFDPeXVM83vIuWI25i5/SYsU9HwgxsyGZcPbPkQIGb/jHoZPI
xA==
-----END CERTIFICATE-----`;

@Injectable()
export class CasdoorService {
  private casdoor: SDK;
  constructor(config: ConfigService) {
    this.casdoor = new SDK({
      endpoint: config.get<string>('CASDOOR_ENDPOINT'),
      clientId: config.get<string>('CASDOOR_CLIENT_ID'),
      clientSecret: config.get<string>('CASDOOR_CLIENT_SECRET'),
      certificate: cert,
      orgName: config.get<string>('CASDOOR_ORG_NAME'),
    });
  }
  get sdk(): SDK {
    return this.casdoor;
  }
}
