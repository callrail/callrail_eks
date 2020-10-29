import { exec as execCP } from 'child_process';
import { promisify } from 'util';

const execPromisify = promisify(execCP);

const execAsync = async (commandString: string): Promise<void> => {
  const { stdout, stderr } = await execPromisify(commandString);

  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
}

const exec = (commandString: string): void => {
  execCP(commandString, (error: any, stdout: any, stderr: any) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(stdout);
  });
}
export {
  exec,
  execAsync
};