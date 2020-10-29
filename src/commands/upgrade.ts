import { Command, flags } from '@oclif/command';
import { exec } from '../helpers/exec';

export default class Upgrade extends Command {
  static description = 'Updates helm repo';
  static examples = ['$callrail_eks upgrade'];
  static flags = {
    help: flags.help({char: 'h'}),
  };
  static args = [];

  async run() {
    exec('helm repo update');
  }
}
