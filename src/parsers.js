import yaml from 'js-yaml';

export default (format, file) => {
  switch (format) {
    case '.json':
      return JSON.parse(file);

    case '.yaml':
    case '.yml':
      return yaml.safeLoad(file);
    default:
      throw new Error(`Unknown format ${format}!`);
  }
};
