# require-tasks

[![Build Status](https://img.shields.io/npm/v/require-tasks.svg)](https://www.npmjs.com/package/require-tasks)
[![Build Status](https://travis-ci.org/DSchau/require-tasks.svg?branch=master)](https://travis-ci.org/DSchau/require-tasks)

> A tool to require a directory, and (optionally) inject each file in that directory with supplied arguments

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
