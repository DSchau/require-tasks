# require-tasks

A tool to require a directory, and (optionally) inject each file in that directory with supplied arguments

## Usage

```bash
npm i require-tasks -D
```

```javascript
import requireTasks from 'require-tasks';

const tasks = requireTasks(['build/tasks']);
```

`tasks` will be an object with each key representing the filename of every file in `build/tasks`. Additionally, any files that export an object (or a function that returns an object) will available as a property on the filename as the key.
