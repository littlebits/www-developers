# littleBits Cloud REST API
## General Overview

This is the HTTP REST API for the littleBits Cloud. 

Every request to the API must contain an Authorization http header bearing an auth token. 

- JSON for data
- OAuth 2 for authorization

## Endpoints Overview
```
                                ---Responds---
                        OAuth   HTTP
path                    Scope   Code Payload ◆        Make Bitcloud...
----                    -----   ---- ---------        ----------------
/api/cloudbits
  GET                   read    200  [<Cloudbit>]     return a list of the users cloudbits
  /{cloudbitid}
    GET                 read    200  <Cloudbit>       return model for the given cloudbit
    PUT                 admin   200  <Cloudbit>       Update the given cloudbit's model
    POST                --      201  <Cloudbit>       add the given cloudbit to the database
    DELETE              --      200  <Cloudbit>       remove the given cloudbit from the databse
    /output
      POST              write   200                   output some voltage on the given cloudbit
    /subscriptions
      GET               read    200  [<String:URI>]   return a list of the publishers to which given cloudbit is subscribed
      POST              read    201                   publish given cloudbit events to given endpoint
      DELETE            read    200                   stop publishing given cloudbit events to a given endpoint
    /activate
      POST              admin   200  <Cloudbit>       activate the given cloudbit; this will associate the cloudbit with 
                                                      the user's account typically going to be done by a user one time 
                                                      after buying a cloudbit
      DELETE            admin   200  <Cloudbit>       deactivate the given cloudbit; this will disassociate the cloudbit 
                                                      from the user's account it is then possible for any user to activate 
                                                      it again
```
◆ [Objects Schemas](#object-schemas)
## /api/cloudbits/{cloudbitid}
### GET
**Returns** and `Array` of cloudbit objects:
```
[
    {
        "id": "000001", 
        "label": "000001", 
        "subscribers": [], 
        "subscriptions": [], 
        "user_id": "1", 
        "wifi": {}
    },
    {
        "id": "000002", 
        "label": "000002", 
        "subscribers": [], 
        "subscriptions": [], 
        "user_id": "1", 
        "wifi": {}
    }
]
```

## /api/cloudbits/{cloudbitid}/output
### POST
```
? amount
  | <Integer:Range:0-1023>       –––– an absolute value within the DAC range
  | <IntegerString:Range:0-100%> –––– a percentage of the DAC range
  | <String:Level>               –––– a labeled 'level' of the DAC range
                                    - Levels: 'active', 'idle'
  – default: 'active'

? duration_ms:
  | <Integer>                    –––– output will be sustained for given milliseconds
                                    – if the duration_ms is < 0 it is floored to 0
  - default: 500
```

**Returns** success:
```
{}
```
or error:
```
{
    "code": 403, 
    "error": "Forbidden", 
    "message": "You do not own this cloudbit"
}
or
{
    "code": 404, 
    "error": "Not Found", 
    "message": "The cloudbit 000001 is not currently connected to bitcloud."
}
```
> #### Examples
>
    The default (used if you do not supply values yourself)
    {"amount":"active", "duration_ms":500}
>
    output at 75% power for one-second
    {"amount":"75%", "duration_ms":1000}
>
    idle output for one week (subequent "output" requests would overwrite this)
    {"amount":"idle", "duration_ms":10080000}
>
    output at DAC 1023 (AKA "100%") for half-a-second
    {"amount":1023}

## /api/cloudbits/{cloudbitid}/subscriptions
### GET
**Returns** an `Array` of subscription objects:
```
[
    {
        "events": [
            "amplitude"
        ], 
        "publisher_id": "000001", 
        "subscriber_id": "000002"
    },
    {
        "events": [
            "amplitude:delta:ignite"
        ], 
        "publisher_id": "000001",
        "subscriber_id": "http://some.callback.com?params=stuff"
    }
]
```

Note:

If you create a subscription at /api/cloudbits/000001/subscriptions { subscriber_id:"000002" }, and then GET subscriptions for 000001, you won’t see the subscription you just created! This seems broken but isn’t: GET /subscriptions is showing from the publisher’s perspective. You will see this subscription by /api/cloudbits/000002/subscriptions.

TODO: we should at least show all relevant subscriptions at /subscriptions, whether the given cloudbit is the publisher or subscriber in the relationship. Then we should consider changing this more fundamentally to make more sense and be more RESTful.

### DELETE
```
? subscriber_id: <String:URI> –– Specific Endpoint to unsubscribe
                               - If omitted then ALL endpoints will be unsubscribed
```

**Returns** a somewhat obscure success message:
```
[
    1, 
    1, 
    1
]
```

### POST
```
! subscriber_id: <String:URI> –– An endpoint that bitcloud will POST event data to
? publisher_events: [<Event>] –– Channels to subscribe to
                               - Default: ['amplitude:delta:ignite']
```

Notes:

Each channel is POSTed to individually. For example if a client were to include "connection" and "amplitude" channels in their subscription they could receive POSTs for either channel but never a single POST for both channels simultaneously

Payload sent to subscriber_id:
    {"bit_id":<String>, "user_id":<Int>, "timestamp":<Int>, "type":"amplitude", "payload":<Amplitude>}

**Returns** a summary of what was just POSTed:
```
{
    "events": [
        "amplitude"
    ], 
    "publisher_id": "000001", 
    "subscriber_id": "000002"
}
```

> #### `subscriber_id` field details
    Notes:
>
    - The given subscriber_id MUST respond with HTTP 200 within 15s [if it is a URI subscriber]
>
    - For any other response (including 15s timeout) Bitcloud
       will exponentially backoff 8 times until finally deleting
       the subscription (note: not banned, it may re-subscribe)
>
    - If the endpoint resumes on any step the fail counter is reset
>
      Exponential backoff
      --------------------
      Fail count:    1   2   3  4   5  6  7  8
      Retry in  :    10s 30s 1m 10m 1h 1d 1w Deleted

> #### `publisher_events` field details
>
>>  The following lists all available channels
>>
    amplitude                  –––– when there is any voltage (catch-all, default)
    amplitude:delta:sustain    –––– when high voltage is constant (eg button being held)
    amplitude:delta:ignite     –––– when there is significant voltage jump (eg button press)
    amplitude:delta:release    –––– when there is significant voltage drop (eg button release)
    amplitude:delta:nap        –––– when low voltage is constant (eg idle bit system)
    amplitude:level:active     –––– generic, when there is high voltage (eg during a sustain or maybe just ignited)
    amplitude:level:idle       –––– generic, when there is low voltage (eg during a long nap or maybe just released)
>>
  You may subscribe to multiple channels, e.g.:
>>
    events: ['amplitude:delta:release', 'amplitude:delta:ignite']
>>


#### Examples
All Examples pertain to this scenario:
```
Client subscribes... (Substitute "..." with examples below)
> POST
  uri: https://cloud.littlebits.cc/api/cloudbits/000001/subscriptions
  payload: { subscriber_id: 'http://foo.com/bar', publisher_events: ... }

When events occur, Cloud publishes... (substitute "..." with examples below)
> POST
  uri: http://foo.com/bar
  payload: ...
```
```
client.payload.publisher_events = ['amplitude']

POSTed to subscriber:
{bit_id:"000001", user_id:<Int>, timestamp:<Int>, type:"amplitude", payload: {absolute:*, percent:*, delta:*, level:*}}
```
```
client.payload.events = ['amplitude:delta:ignite']

POSTed to subscriber:
{bit_id:"000001", user_id:<Int>, timestamp:<Int>, type:'amplitude', payload: {absolute:*, percent:*, delta:'ignite', level:*}}
```
```
client.payload.events = ['amplitude:delta:ignite', 'amplitude:delta:sustain']

POSTed to subscriber:
{bit_id:"000001", user_id:<Int>, timestamp:<Int>, type:'amplitude', payload: {absolute:*, percent:*,  delta:'sustain'|'ignite', level:*}}
```


## Object Schemas
```
Cloudbit:
  id:     <String>              ––––  code that identifies *this* cloudbit
                                      Unique among all cloudbits and guaranteed to not change
  user_id: <Integer>            ––––  Code that identifies a Little Bits user.
                                      Typically does not change except during activation/deactivation
  label:  <String>              ––––  Memorable user-chosen label so that the user can easily identify the cloudbit
                                      Unique among the user's cloudBits
  subscribers: [<String:URI>]   ––––  clients subscribed to this cloudbit


Amplitude:
  absolute: <Integer:0-1023>
  percent:  <Float:0-100>
  level:    <String:('active'|'idle')>
  delta:    <String:('nap'|'release'|'ignite'|'sustain')>   # shift?
```


## Resources
- There is a [dummy OAuth-client](http://oauth-client.herokuapp.com/) to create access tokens.
- IFTTT can read a document pertaining to their "test environment" on Bitcloud: [link](https://docs.google.com/document/d/1crvK5JA0u3GDzlwTiWoKWGfcD-mGzulUltr95R9a6AE/edit)