const os = require("os");

console.log("Desktop Informations:");

Object.keys(os)
  .filter((key) => typeof os[key] === "function")
  .forEach((method) => {
    try {
      const result = os[method]();
      console.log(`${method}:`, result);
    } catch (error) {
      console.log(`${method}: Not callable or requires arguments`);
    }
  });

// console.log("Desktop Informations:");
// console.log(`Hostname: ${os.hostname}`);
// console.log(`Platform: ${os.platform}`);
// console.log(`CPU: ${os.cpus()[0].model}`);
// console.log(`Memory: ${os.totalmem() / 1024 / 1024} MB`);
// console.log(`Free Memory: ${os.freemem() / 1024 / 1024} MB`);
// console.log(`Uptime: ${os.uptime()}`);
// console.log(`User: ${os.userInfo().username}`);
// console.log(`Home Directory: ${os.homedir()}`);
// console.log(`OS Type: ${os.type()}`);
// console.log(`OS Architecture: ${os.arch()}`);
// console.log(`OS Endianness: ${os.endianness()}`);
// console.log(`OS Version: ${os.version()}`);
// console.log(`OS Release: ${os.release()}`);
// console.log(`OS Platform: ${os.platform()}`);
// Get all network interfaces
