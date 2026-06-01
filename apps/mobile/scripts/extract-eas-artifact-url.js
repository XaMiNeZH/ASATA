const fs = require('fs');

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  console.error('Usage: node extract-eas-artifact-url.js <input-json> <output-txt>');
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, 'utf8').trim();

let data;
try {
  data = JSON.parse(raw);
} catch (error) {
  console.error('Failed to parse EAS JSON output.');
  console.error(error);
  console.error(raw.slice(0, 1000));
  process.exit(1);
}

const builds = Array.isArray(data) ? data : [data];
const candidates = [];

for (const build of builds) {
  if (!build || typeof build !== 'object') continue;

  if (build.artifacts && typeof build.artifacts === 'object') {
    candidates.push(build.artifacts.buildUrl);
    candidates.push(build.artifacts.applicationArchiveUrl);
    candidates.push(build.artifacts.url);
  }

  candidates.push(build.artifactUrl);
  candidates.push(build.url);
}

const artifactUrl = candidates.find(
  (value) =>
    typeof value === 'string' &&
    value.startsWith('http') &&
    (
      value.includes('.apk') ||
      value.includes('.aab') ||
      value.includes('.ipa') ||
      value.includes('.tar.gz') ||
      value.includes('expo.dev') ||
      value.includes('expo.io')
    )
);

if (!artifactUrl) {
  console.error('Could not find artifact URL in EAS JSON output.');
  console.error(JSON.stringify(data, null, 2).slice(0, 3000));
  process.exit(1);
}

fs.writeFileSync(outputPath, artifactUrl);
console.log(`Artifact URL written to ${outputPath}`);
