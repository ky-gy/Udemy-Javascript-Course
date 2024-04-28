#!/usr/bin/env node

// TO USE CHALK MODULE --> "Type" : "module" in package.json file.
// This makes syntax change from 'require' to 'import'

// const fs = require("fs");
// const util = require("util");
// const chalk = require("chalk");
// const path = require("path");
import fs from "fs";
import util from "util";
import chalk from "chalk";
import path from "path";

// Method #2
// const lstat = util.promisify(fs.lstat);

// Method #3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  // Either
  // errr === an error object, which means something went wrong
  // or
  // err === null, which means everything is ok

  if (err) {
    // error handling code here
    console.log(err);
  }

  const statPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, wfilename));
  });

  const allStats = await Promise.all(statPromises);
  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(chalk.cyanBright(filenames[index]));
    } else {
      console.log(chalk.yellowBright(filenames[index]));
    }
  }
});

// Method #1
// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(stats);
//     });
//   });
// };
