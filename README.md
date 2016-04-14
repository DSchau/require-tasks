# require-tasks

[![Build Status](https://img.shields.io/npm/v/require-tasks.svg)](https://www.npmjs.com/package/require-tasks)
[![Build Status](https://travis-ci.org/DSchau/require-tasks.svg?branch=master)](https://travis-ci.org/DSchau/require-tasks)
[![David](https://img.shields.io/david/DSchau/require-tasks.svg)](https://david-dm.org/DSchau/require-tasks)

A tool to require a directory, and (optionally) inject each file in that directory with supplied arguments.

For example, given the following directory structure:

```
├── build
   ├── tasks
      └── copy.js
      └── webpack.js
```

this tool (when configured to search in `build/tasks`) will load each file in tasks, and will inject each task with supplied arguments.

## Install

```bash
npm i require-tasks -D
```

## Usage

```javascript
import requireTasks from 'require-tasks';

const tasks = requireTasks(['build/tasks'])(); // any arguments passed will be made available to any task that exports a function
```

`tasks` will be an object with each key representing the filename of every file in `build/tasks`. Additionally, any files that export an object (or a function that returns an object) will available as a property on the filename as the key.

### Multi-tasks

Additionally, if a task returns an object, that task will be treated as "multi-task" and each key in the object will be added to the parent task. For example, given the following task:

#### build/tasks/copy.js

```javascript
export default function copy(...args) {
  return {
    benz() {
      // do something
    },
    otherBenz() {
      // do something else
    },
    otherOtherBenz() {
      // do this thing
    }
  };
}
```

The returned object will contain a property like so:

```javascript
{
  copy: {
    benz() {},
    otherBenz() {},
    otherOtherBenz() {}
  }
}
```
