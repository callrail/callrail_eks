import { Command, flags } from '@oclif/command';
import { exec } from 'child_process';

export default class Upgrade extends Command {
  static description = 'Updates helm repo';
  static examples = ['$callrail_eks upgrade'];
  static flags = {
    help: flags.help({char: 'h'}),
  };
  static args = [];

  async run() {
    const {args, flags} = this.parse(Upgrade)
    exec('helm repo update', (error, stdout, stderr) => {
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
}
