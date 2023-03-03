const SERVICE_UUID4 = "974f9e8a-124d-43a8-8896-9a5ba15526be";
const CHARACTERISTIC_UUID4 = "03029100-6d76-46c9-b233-7614d893a6ac";

const statusLabel4 = document.getElementById("statusLabel4");
const connectButton4 = document.getElementById("connectButton4");

let lastValue4 = "";

connectButton4.addEventListener("click", connect4);

function displayStatus4(status) {
  statusLabel4.innerHTML = status;
}

async function connect4() {
  displayStatus4("Searching devices for service " + SERVICE_UUID4);

  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ name: "COMET4" }],
      optionalServices: ["974f9e8a-124d-43a8-8896-9a5ba15526be"],
    });
    displayStatus4("Found device " + device.name + " with service");

    const server = await device.gatt.connect();
    displayStatus4("Connected to GATT server");

    const service = await server.getPrimaryService(SERVICE_UUID4);
    displayStatus4("Connected to service " + SERVICE_UUID4);

    const characteristic = await service.getCharacteristic(
      CHARACTERISTIC_UUID4
    );
    setInterval(async () => {
      try {
        let readData = await characteristic.readValue();

        let value = "";
        if (readData.byteLength > 0) {
          for (let i = 0; i < readData.byteLength; i++) {
            console.log("Tablet 4: " + readData.getUint8(i));
            if (readData.getUint8(i) == 255) {
              value = value + ",";
            } else {
              value = value + readData.getUint8(i);
            }
          }
          if (value != lastValue4) {
            lastValue4 = value;
            displayStatus4(value);
          }
        }
      } catch (error) {
        displayStatus4("Error: " + error);
      }
    }, 10000);
  } catch (error) {
    displayStatus4("Error: " + error);
  }
}
