/*
 Generates an Extent report from Mochawesome merged JSON if extent-reports is installed.
 Usage: npm run report:extent
*/

const fs = require('fs');
const path = require('path');

const MERGED_JSON = path.resolve('cypress/reports/mochawesome.json');
const OUT_DIR = path.resolve('cypress/reports/extent');
const OUT_FILE = path.join(OUT_DIR, 'index.html');

function readMochawesome() {
  if (!fs.existsSync(MERGED_JSON)) {
    console.error(`Merged Mochawesome JSON not found at ${MERGED_JSON}. Run: npm run report:merge`);
    process.exit(0);
  }
  const raw = fs.readFileSync(MERGED_JSON, 'utf-8');
  return JSON.parse(raw);
}

function flattenTests(results) {
  const tests = [];
  const walkSuite = (suite, ancestors = []) => {
    (suite.tests || []).forEach((t) => tests.push({ ancestors, test: t }));
    (suite.suites || []).forEach((s) => walkSuite(s, [...ancestors, suite.title]));
  };
  (results.results || []).forEach((r) => (r.suites || []).forEach((s) => walkSuite(s)));
  return tests;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function tryExtent(tests) {
  try {
    // Attempt to use extent-reports Node SDK (if installed)
    // eslint-disable-next-line import/no-extraneous-dependencies
    const extent = require('extent-reports');
    const { ExtentReports, ExtentSparkReporter, Status } = extent;

    ensureDir(OUT_DIR);

    const reporter = new ExtentSparkReporter({ reportFile: OUT_FILE });
    const report = new ExtentReports();
    report.attachReporter(reporter);

    tests.forEach(({ test }) => {
      const name = test.fullTitle || test.title;
      const node = report.createTest(name);
      const state = test.state || (test.pass ? 'passed' : test.fail ? 'failed' : 'skipped');
      const logs = (test.context && typeof test.context === 'string' ? test.context : '').toString();
      const status = state === 'passed' ? Status.PASS : state === 'failed' ? Status.FAIL : Status.SKIP;
      if (status === Status.FAIL && test.err && test.err.message) {
        node.fail(test.err.message);
      } else if (status === Status.PASS) {
        node.pass('Passed');
      } else {
        node.skip('Skipped');
      }
      if (logs.includes('screenshots')) {
        // Attach first screenshot if exists in context
        const match = logs.match(/cypress[\s\S]*?screenshots[\s\S]*?\.png/);
        if (match) {
          try {
            node.addScreenCaptureFromPath(match[0]);
          } catch (_) {}
        }
      }
    });

    report.flush();
    console.log(`Extent report generated: ${OUT_FILE}`);
  } catch (e) {
    console.warn('extent-reports not installed or API unavailable. To enable Extent:');
    console.warn('  npm i -D extent-reports');
    console.warn('Then re-run: npm run report:extent');
  }
}

function main() {
  const json = readMochawesome();
  const tests = flattenTests(json);
  tryExtent(tests);
}

main();
