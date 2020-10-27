import { Command, flags } from '@oclif/command';
import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import {
  readFileSync,
  existsSync
} from 'fs';

const execAsync = promisify(exec);

export default class Delete extends Command {
  static description: string = 'Deletes the stack along with the stateful sets associated with it';
  static examples: string[] = ['$callrail_eks delete'];
  static flags = {
    help: flags.help({char: 'h'}),
    namespace: flags.string({char: 'n'}),
  };
  static args = [];

  fileName: string = join(__dirname, 'config.json');

  async run() {
    const {args, flags} = this.parse(Command);
    const { namespace: namespaceFlag } = flags;

    const namespace = namespaceFlag || this.getNamespace();

    await this.runCommand(`kubectl delete statefulset ${namespace}-callrail-postgresql-master`);
    await this.runCommand(`kubectl delete statefulset ${namespace}-rowdy-postgresql-master`);
    await this.runCommand(`kubectl delete statefulset ${namespace}-swappy-postgresql-master`);
    await this.runCommand('kubectl delete pvc --all');
    await this.runCommand(`helm delete ${namespace}`);
  }

  private getNamespace(): string {
    const error: Error = new Error('No namespace specified. Please run the namespace command');

    if(existsSync(this.fileName)) {
      const rawData = readFileSync(this.fileName);
      const parsedData = JSON.parse(rawData.toString());
      const { namespace } = parsedData;
      if(!namespace) throw error;
      return namespace;

    } else {
      throw error;
    }
  }

  private commandExec(stdout: string, stderr: string): void {
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  }

  private async runCommand(commandString: string): Promise<void> {
    const { stdout, stderr } = await execAsync(commandString);
    this.commandExec(stdout, stderr)
  }
}
