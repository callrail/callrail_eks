import { Command, flags } from '@oclif/command';
import { exec } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export default class Update extends Command {

  static description: string = 'Installs the callrails eks environment.';
  static examples: string[] = [
    `$ callrail_eks install`,
    `$ callrail_eks install -b my-branch`,
    `$ callrail_eks install -s callrail/stack`,
    `$ callrail_eks install -n my-namespace`,
    `$ callrail_eks install -c "~/my-custom-yaml.yml"`
  ];
  static flags = {
    help: flags.help({char: 'h'}),
    branch: flags.string({
      char: 'b',
      default: 'master'
    }),
    stack: flags.string({
      char: 's',
      default: 'callrail/stack'
    }),
    config: flags.string({ char: 'c'}),
    namespace: flags.string({char: 'n'}),
  };

  static args = [];
  configFileLocation: string =  join(__dirname, 'config.json');

  async run() {
    const {args, flags} = this.parse(Update);
    const {
      branch,
      stack,
      config,
      namespace: namespaceFlag
    } = flags;

    const namespace = namespaceFlag || this.getNamespace();
    const eksConfigLocation = config || this.getEKSConfigLocation()
    const commandString = `helm ssm install ${namespace} ${stack} -f ${config || eksConfigLocation}`;

    exec(commandString, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }

  private getNamespace(): string {
    const error: Error = new Error('No namespace specified. Please run the namespace command');

    if(existsSync(this.configFileLocation)) {
      const rawData = readFileSync(this.configFileLocation);
      const parsedData = JSON.parse(rawData.toString());
      const { namespace } = parsedData;
      if(!namespace) throw error;
      return namespace;

    } else {
      throw error;
    }
  }

  private getEKSConfigLocation(): string {
    const rawData = readFileSync(this.configFileLocation);
    const parsedData = JSON.parse(rawData.toString());
    const { config } = parsedData;
    return config || '~/eks_config.yaml';
  }
}
