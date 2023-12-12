# yamcs-protobufjs-static

This package provides protobufjs definitions and typings for YAMCS.

To use:

```js
// Import the package
import { google, yamcs } from 'yamcs-protobufjs-static';

// Extract the needed types
const { SubscribeParametersRequest } = yamcs.protobuf.processing;
const { ClientMessage, CancelOptions } = yamcs.api;
const { Any } = google.protobuf;

const socket = new WebSocket('ws://localhost:8090/', 'protobuf');
socket.binaryType = 'arraybuffer';

let connected = false;

socket.onopen = () => {
    connected = true;
}

// Example of subscribing to a parameter
const id = [yamcs.protobuf.NamedObjectId.create({ name: 'myNamedObject'})];
const message = {
    type: 'parameters',
    instance: 'myInstance',
    processor: 'myProcessor',
    id,
    sendFromCache: true,
    updateOnExpiration: true
};

// Verify that it fits the schema of a `SubscribeParametersRequest`
let err = SubscribeParametersRequest.verify(message);
if (err) {
    throw Error(err);
}

let payload = SubscribeParametersRequest.create(message);
const arrayBuffer = SubscribeParametersRequest.encode(payload).finish();
const clientMessagePayload = {
    type: dataType,
    id: subscriptionId,
    options: Any.create({
        type_url: SubscribeParametersRequest.getTypeUrl(),
        value: arrayBuffer
    })
};

// Verify that it fits the schema of a `ClientMessage`
err = ClientMessage.verify(clientMessagePayload);
if (err) {
    throw Error(err);
}

const clientMessage = ClientMessage.create(clientMessagePayload);

if(connected) {
    socket.send(ClientMessage.encode(clientMessage).finish());
}
```
