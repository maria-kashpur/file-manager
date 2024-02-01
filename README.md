# file-manager
task: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md


The program is started by npm-script start in following way:
```bash
npm  run  start  --  --username=your_username
```
List of operations and their syntax:
 - **up** -  go upper from current directory;
 -  **cd *path_to_directory*** - go to dedicated folder from current directory;
 - **ls** - show list of all files and folders in current directory;
 - **cat *path_to_file*** - show file content;
 - **add *new_file_name*** - create empty file in current working directory;
 - **rn *path_to_file new_filename*** - rename file;
 - **cp *path_to_file path_to_new_directory*** - copy file;
 - **mv *path_to_file path_to_new_directory*** - move file;
 - **rm *path_to_file*** - delete file;
 - **os --EOL** - show default system End-Of-Line;
 - **os --cpus** - show host machine CPUs info;
 - **os --homedir** - show home directory;
 - **os --username** - show current system user name;
 - **os --architecture** - show CPU architecture for which Node.js binary has compiled;
 - **hash *path_to_file*** - show calculated hash for file;
 - **compress *path_to_file path_to_destination*** - compress file (using Brotli algorithm, should be done using Streams API);
 - **decompress *path_to_file path_to_destination*** - decompress file (using Brotli algorithm, should be done using Streams API);
 - **.exit** - finish program.
