import * as sdk from "matrix-js-sdk";
const client = sdk.createClient({ baseUrl: "http://localhost:8008/" });
client.publicRooms(function (err, data) {
    console.log("Public Rooms: %s", JSON.stringify(data));
});

await client.startClient({ initialSyncLimit: 10 });

client.once("sync", function (state, prevState, res) {
    if (state === "PREPARED") {
        console.log("prepared");
    } else {
        console.log(state);
        process.exit(1);
    }
});

const content = {
    body: "message text",
    msgtype: "m.text",
};
client.sendEvent("roomId", "m.room.message", content, "", (err, res) => {
    console.log(err);
});