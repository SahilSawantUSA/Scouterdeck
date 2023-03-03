const SERVICE_UUID6 = "974f9e8a-124d-43a8-8896-9a5ba15526be";
const CHARACTERISTIC_UUID6 = "03029100-6d76-46c9-b233-7614d893a6ac";

const statusLabel6 = document.getElementById("statusLabel6");
const connectButton6 = document.getElementById("connectButton6");

let lastValue6 = "";

connectButton6.addEventListener("click", connect6);

function displayStatus6(status) {
  statusLabel6.innerHTML = status;
}

async function connect6() {
  displayStatus6("Searching devices for service " + SERVICE_UUID6);

  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ name: "COMET6" }],
      optionalServices: ["974f9e8a-124d-43a8-8896-9a5ba15526be"],
    });
    displayStatus6("Found device " + device.name + " with service");

    const server = await device.gatt.connect();
    displayStatus6("Connected to GATT server");

    const service = await server.getPrimaryService(SERVICE_UUID6);
    displayStatus6("Connected to service " + SERVICE_UUID6);

    const characteristic = await service.getCharacteristic(
      CHARACTERISTIC_UUID6
    );
    setInterval(async () => {
      try {
        let readData = await characteristic.readValue();

        let value = "";
        if (readData.byteLength > 0) {
          for (let i = 0; i < readData.byteLength; i++) {
            console.log("Tablet 6: " + readData.getUint8(i));
            if (readData.getUint8(i) == 255) {
              value = value + ",";
            } else {
              value = value + readData.getUint8(i);
            }
          }
          if (value != lastValue6) {
            lastValue6 = value;
            displayStatus6(value);
          }
        }
      } catch (error) {
        displayStatus6("Error: " + error);
      }
    }, 10000);
  } catch (error) {
    displayStatus6("Error: " + error);
  }
}
