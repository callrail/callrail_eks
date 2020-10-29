const execCallback = (error: any, stdout: any, stderr: any) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(stdout);
};

export { execCallback };