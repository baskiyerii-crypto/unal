import * as migration_20260820_153928_initial from './20260820_153928_initial';
import * as migration_20260821_191111_contact_persons from './20260821_191111_contact_persons';

export const migrations = [
  {
    up: migration_20260820_153928_initial.up,
    down: migration_20260820_153928_initial.down,
    name: '20260820_153928_initial',
  },
  {
    up: migration_20260821_191111_contact_persons.up,
    down: migration_20260821_191111_contact_persons.down,
    name: '20260821_191111_contact_persons'
  },
];
