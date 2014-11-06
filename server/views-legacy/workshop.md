## littleBits Cloud Workshop

#### HTTP API
- [documentation](/endpoints)
- main functions:
  - [send](/api-http#-devices-device-id-output) to the hardware’s output
  - [subscribe](/api-http#post-2) to events on the hardware’s input

#### Web-based Tools
- [simple output trigger button](http://apps.littlebitscloud.cc/button)
- [simple input readout 7-segment display](http://apps.littlebitscloud.cc/number)
- the above require oAuth log in, use:
  - u: colin+demo@littlebits.cc
  - p: demodemo

#### Code Tools
- [simple output code sample \[jQuery]](https://gist.github.com/stresslimit/408da4e3581e88679eee)
- the above require an access token, plus the ID of the device you are using
  - access_token: 146d4a80ef978b4dfb5558289c79a2f43f73d427b634302d9b37623d81e770e5
  - device_id is written on the bottom of your cloud module
