/* eslint-disable no-self-compare */
// no import here as this runs without babel
const fs = require('fs');
const path = require('path');
const omit = require('lodash/omit');

const hiddenFile = /(^(\.|\/\.))|(.md$)/g; //过滤系统自动生成文件和 md 文件的正则

function getFilesFor(dir) {  // dir参数的默认值是 challenges
  let targetDir = path.join(__dirname, dir); // __dirname 代表当前文件所在的目录，即：/Users/ff/fcc/learn/curriculum
  let total = fs.readdirSync(targetDir)
  console.log(total)
  return total  // targetDir 代表文件系统每次读取的目标目录，这个值是变化的，第一次为：/Users/ff/fcc/learn/curriculum/challenges，第二次为：/Users/ff/fcc/learn/curriculum/challenges/01-responsive-web-design，以此类推。
    .filter(function(file) {
      console.log('filter:'+file)
      return !hiddenFile.test(file)
    })
    .map(function(file) {
      console.log('map:'+file)
      let superBlock;
      if (fs.statSync(path.join(targetDir, file)).isFile()) {
        console.log('enter judge')
        return {file: file};
      }
      superBlock = file;
      console.log('superBlock:'+superBlock)
      return getFilesFor(path.join(dir, superBlock))
        .map(function(data) {
          console.log('enter recursive')
          console.log(data)
          console.log({
            file: path.join(superBlock, data.file),
            superBlock: superBlock
          })
          return {
            file: path.join(superBlock, data.file),
            superBlock: superBlock
          };
        });
    })
    .reduce(function(files, entry) {
      console.log('enter reduce')
      console.log(files)
      return files.concat(entry);
    }, []);
}

function superblockInfo(filePath) {
  let parts = (filePath || '').split('-');
  let order = parseInt(parts[0], 10);
  if (isNaN(order)) {
    return {order: 0, name: filePath};
  } else {
    return {
      order: order,
      name: parts.splice(1).join('-')
    };
  }
}

function getChallenges(challengesDir) {
  if (!challengesDir) {
    challengesDir = 'challenges';
  }
  var result =  getFilesFor(challengesDir)
    .map(function(data) {
      const challengeSpec = require('./' + challengesDir + '/' + data.file);
      let superInfo = superblockInfo(data.superBlock);
      challengeSpec.fileName = data.file;  // fileName: '08-coding-interview-prep/data-structures.json'
      challengeSpec.superBlock = superInfo.name; //  superBlock: 'coding-interview-prep'
      challengeSpec.superOrder = superInfo.order; // superOrder: 8
      challengeSpec.challenges = challengeSpec.challenges
        .map(challenge => omit(
          challenge,
          [
            'betaSolutions',
            'betaTests',
            'hints',
            'MDNlinks',
            'null',
            'rawSolutions',
            'react',
            'reactRedux',
            'redux',
            'releasedOn',
            'translations',
            'type'
          ]
        ));
      // console.log(challengeSpec)
      return challengeSpec;
    });
  console.log(result)
  return result
};
getChallenges()