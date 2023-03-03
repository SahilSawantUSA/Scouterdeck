const SERVICE_UUID5 = "974f9e8a-124d-43a8-8896-9a5ba15526be";
const CHARACTERISTIC_UUID5 = "03029100-6d76-46c9-b233-7614d893a6ac";

const statusLabel5 = document.getElementById("statusLabel5");
const connectButton5 = document.getElementById("connectButton5");

let lastValue5 = "";

connectButton5.addEventListener("click", connect5);

function displayStatus5(status) {
  statusLabel5.innerHTML = status;
}

async function connect5() {
  displayStatus5("Searching devices for service " + SERVICE_UUID5);

  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ name: "COMET5" }],
      optionalServices: ["974f9e8a-124d-43a8-8896-9a5ba15526be"],
    });
    displayStatus5("Found device " + device.name + " with service");

    const server = await device.gatt.connect();
    displayStatus5("Connected to GATT server");

    const service = await server.getPrimaryService(SERVICE_UUID5);
    displayStatus5("Connected to service " + SERVICE_UUID5);

    const characteristic = await service.getCharacteristic(
      CHARACTERISTIC_UUID5
    );
    setInterval(async () => {
      try {
        let readData = await characteristic.readValue();

        let value = "";
        if (readData.byteLength > 0) {
          for (let i = 0; i < readData.byteLength; i++) {
            console.log("Tablet 5: " + readData.getUint8(i));
            if (readData.getUint8(i) == 255) {
              value = value + ",";
            } else {
              value = value + readData.getUint8(i);
            }
          }
          if (value != lastValue5) {
            lastValue5 = value;
            displayStatus5(value);
          }
        }
      } catch (error) {
        displayStatus5("Error: " + error);
      }
    }, 10000);
  } catch (error) {
    displayStatus5("Error: " + error);
  }
}
