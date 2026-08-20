import * as migration_20260820_153928_initial from './20260820_153928_initial';

export const migrations = [
  {
    up: migration_20260820_153928_initial.up,
    down: migration_20260820_153928_initial.down,
    name: '20260820_153928_initial'
  },
];
