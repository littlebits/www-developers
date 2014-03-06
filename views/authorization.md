# Cloud REST API auth

littleBits uses oAuth2, via the [Doorkeeper](https://github.com/applicake/doorkeeper) gem. It is strongly suggested to read the wiki since this document only describe elements specific to the littleBits implementation. The implementation was tested using the oAuth2 gem (following the example provided in the Doorkeeper wiki).

### Tokens

Access tokens should not expire. If they do they can be renewed without requiring user intervention with the use of a refresh token.

### Scopes
Client application can ask for the `read` and the `write` scopes.

### Adding a client application

Only littleBits administrator can add client applications. To do so, the admin has to go to `/oauth/applications` and click on the "new application" link.

From there, 2 fields must be filled: Name and Callback URL. Name is the name of the client application (ex: IFTTT) and the callback URL is the url the authentication server should redirect to on the client application once the user has approved/denied his permission to link his littleBits credentials with the client application.

## Authentication End points

### Requesting user permission

    GET http://littlebits.cc/oauth/authorize?response_type=code&client_id=<client_ID>&redirect_uri=<callback_URL>

Ex:

`GET https://littlebits.cc/oauth/authorize?response_type=code&client_id=52e7f55a78c031a1ea9cfd1901e0273d35cbf2a403c6e68cb4aa058708e6e032&redirect_uri=http%3A%2F%2Foauth-client.herokuapp.com%2Fauth%2Flittlebits%2Fcallback`

Prompts the user to allow/deny access to littleBits from the client application. If the user clicks the 'allow' button, the littleBits server calls back the provided URL.

From there, the client application can generate both his `access token` and `refresh token`. Access Tokens should not expire. Client applications should store both tokens and only send the refresh token when their access token is rejected.

### Refresh token

`POST http://littlebits.cc/oauth/token?grant_type=refresh_token&client_id=<client_id>&refresh_token=<refresh_token>`

Refresh tokens can be used by the client application to get a new access token (and a new refresh token).