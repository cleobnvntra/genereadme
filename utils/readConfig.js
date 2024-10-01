import fs from "fs";
import path from "path";
import os from "os";
import toml from "toml";

export function readConfigFile() {
  
    const homeDir = os.homedir();
    const configFilePath = path.join(homeDir, "./genereadme-config.toml");
  
    if (fs.existsSync(configFilePath)) {
      try {
        const configFileContent = fs.readFileSync(configFilePath, "utf-8");
       
        return toml.parse(configFileContent);
      } catch (error) {
        console.error("Error parsing the config file:", error.message);
        process.exit(1);
      }
    }
    return {};
  }