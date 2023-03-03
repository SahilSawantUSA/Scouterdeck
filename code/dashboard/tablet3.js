const SERVICE_UUID3 = "974f9e8a-124d-43a8-8896-9a5ba15526be";
const CHARACTERISTIC_UUID3 = "03029100-6d76-46c9-b233-7614d893a6ac";

const statusLabel3 = document.getElementById("statusLabel3");
const connectButton3 = document.getElementById("connectButton3");

let lastValue3 = "";

connectButton3.addEventListener("click", connect3);

function displayStatus3(status) {
  statusLabel3.innerHTML = status;
}

async function connect3() {
  displayStatus3("Searching devices for service " + SERVICE_UUID3);

  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ name: "COMET3" }],
      optionalServices: ["974f9e8a-124d-43a8-8896-9a5ba15526be"],
    });
    displayStatus3("Found device " + device.name + " with service");

    const server = await device.gatt.connect();
    displayStatus3("Connected to GATT server");

    const service = await server.getPrimaryService(SERVICE_UUID3);
    displayStatus3("Connected to service " + SERVICE_UUID3);

    const characteristic = await service.getCharacteristic(
      CHARACTERISTIC_UUID3
    );
    setInterval(async () => {
      try {
        let readData = await characteristic.readValue();

        let value = "";
        if (readData.byteLength > 0) {
          for (let i = 0; i < readData.byteLength; i++) {
            console.log("Tablet 2: " + readData.getUint8(i));
            if (readData.getUint8(i) == 255) {
              value = value + ",";
            } else {
              value = value + readData.getUint8(i);
            }
          }
          if (value != lastValue3) {
            lastValue3 = value;
            displayStatus3(value);
          }
        }
      } catch (error) {
        displayStatus3("Error: " + error);
      }
    }, 10000);
  } catch (error) {
    displayStatus3("Error: " + error);
  }
}
