import path from 'path';

import requireDir from 'require-dir';
import extend from 'extend';

export default function(taskArr = [], options = {}) {
  return function(...args) {
    const taskObj = {};
    [].concat(taskArr).forEach((taskPath) => {
      const tasks = requireDir(path.resolve(taskPath), options);
      for ( const taskName in tasks ) {
        let task = tasks[taskName];
        if ( typeof (task.default || task) === 'function' ) {
          if ( task.default ) {
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
};
