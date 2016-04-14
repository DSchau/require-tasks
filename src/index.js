import path from 'path';

import requireDir from 'require-dir';
import extend from 'extend';

import presets from './defaults';

export default function requireTasks(taskArr = [], options = {}, requireDirOptions = {}) {
  const defaults = extend(presets, options);
  return function inject(...args) {
    const taskObj = {};
    ;[].concat(taskArr).forEach((taskPath) => {
      const tasks = requireDir(path.resolve(taskPath), requireDirOptions);
      for ( const taskName in tasks ) {
        let task = tasks[taskName];
        if ( typeof (task.default || task) === 'function' ) {
          if ( task.default && defaults.injectDefault ) {
            task.default = task.default(...args);
          } else {
            task = task(...args);
          }
        }

        taskObj[taskName] = typeof task === 'object' ?
          extend(taskObj[taskName], task) :
          task;
      }
    });
    return taskObj;
  };
}
