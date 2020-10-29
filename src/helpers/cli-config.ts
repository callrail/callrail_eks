import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const configFileLocation: string =  join(__dirname, 'config.json');

interface ICLIConfig {
  domain?: string;
  namespace?: string;
  config?: string;
}

const readConfigIfExists = (error: Error, callback: (parsedData: ICLIConfig) => string) => {
  if(existsSync(configFileLocation)) {
    const rawData = readFileSync(configFileLocation);
    const parsedData: ICLIConfig = JSON.parse(rawData.toString());
    return callback(parsedData);
  } else {
    throw error;
  }
}

const getDomain = (): string => {
  const error: Error = new Error('No domain specified. Please run the domain command');
  const callback = (parsedData: ICLIConfig) => {
    const { domain } = parsedData;
    if(!domain) throw error;
    return domain;
  }

  return readConfigIfExists(error, callback);
}

const getNamespace = (): string => {
  const error: Error = new Error('No namespace specified. Please run the namespace command');
  const callback = (parsedData: ICLIConfig) => {
    const { namespace } = parsedData;
    if(!namespace) throw error;
    return namespace;
  }

  return readConfigIfExists(error, callback);
}

const getEKSConfigLocation = (): string => {
  const rawData = readFileSync(configFileLocation);
  const parsedData: ICLIConfig = JSON.parse(rawData.toString());
  const { config } = parsedData;
  return config || join(__dirname, '/eks_config.yaml');
}

const writeConfigFile = (data: ICLIConfig): void => {
  let configData: ICLIConfig = data;
  if(existsSync(configFileLocation)) {
    const rawData = readFileSync(configFileLocation);
    const parsedData: ICLIConfig = JSON.parse(rawData.toString());
    configData = { ...parsedData, ...data };
  }
  console.log(configData)
  writeFileSync(configFileLocation, JSON.stringify(configData));
}
  export {
    ICLIConfig,
    configFileLocation,
    writeConfigFile,
    getNamespace,
    getDomain,
    getEKSConfigLocation
  };