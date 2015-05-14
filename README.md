# koco-mutex
Mutex based on knockout

## Installation

```bash
bower install koco-mutex
```

## Usage with KOCO

This is a shared module that is used in other modules. The convention is to configure an alias in the `require.configs.js` with the name `mutex` like so:

```javascript
paths: {
  ...
  'mutex': 'bower_components/koco-mutex/src/mutex'
  ...
}
```
