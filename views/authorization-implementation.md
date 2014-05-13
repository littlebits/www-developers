# littleBits Cloud http API oAuth implementation overview

Legend

    AS = Authorization Server (http://littlebits.cc/oauth/authorize)
    RS = Resource Server
    RO = Resource Owner
    C = Client
    ← HTTPS Request
    → HTTPS Response


Visualization

    |  ⚑ START
    |- RS ← C
    |          ANY (header) Authorization: Token <token>
    |
    |\  if C request missing (header) Authorization
    | \
    |  |- RS → C
    |  |          401 WWW-Authenticate: Bearer realm="bitCloud", error="missing_authorization", error_description="Missing Authorization header with valid Bearer token"
    |  |
    |  |  goto ☛ AUTHORIZE (it is C's responsibility to direct itself here)
    |
    |\  if access_token is not present or expired
    | \
    |  |- RS → C
    |  |          401 WWW-Authenticate: Bearer realm="bitCloud", error="invalid_token", error_description="Invalid or expired token"
    |  |
    |  |  goto ☛ AUTHORIZE (it is C's responsibility to direct itself there)
    |
    |
    |- RS Lookup the token in the TokenDataStore
    |
    |\  if access_token is not present
    | \
    |  |- RS → AS ☛ VALIDATE_TOKEN
    |  |  \
    |  |   \ if access_token is NOT authorized by AS
    |  |          401 WWW-Authenticate: Bearer realm="bitCloud", error="invalid_token", error_description="Invalid token"
    |  |
    |  |  RS ← AS
    |  |          {user_id: xxx} access_token is good
    |  |          RS stores token & user_id in TokenDataStore
    |
    |\  if access_token scope does not encompass requested action
    | \  goto ✖ ERROR {statusCode: 403}
    |
    |- RS does what C requested
    |
    |- RS → C
    |          200 {}
    |  ✔ FIN


    |  ☛ AUTHORIZE
    |
    |- C → AS
    |
    |\  if C has a valid refresh token:
    | \  200 {access_token:}, goto ⚑ START
    |
    |- C asks RO to grant permission to access RS for particular scopes
    |
    |- RO accepts
    |
    |- AS → C
    |          200 {auth_token:}
    |- AS ← C requests access_token using auth_token
    |          GET {client_id:, client_secret:, code:, redirect_uri:, grant_type:}
    |
    |- AS → C
    |          200 {access_token:, refresh_token:?, expires_in:?}
    |
    |- goto ⚑ START


    | ☛ VALIDATE_TOKEN
    |
    |- RS → AS
    |
    |\  if RS has a valid access token:
    | \  200 {user_id:}
    |   else
    |    200 {authorized:false}


    |  ✖ ERROR
    |- RS → C
    |          {code:, message:}